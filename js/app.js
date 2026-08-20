// 应用状态
const state = {
    currentScene: null,
    completedScenes: new Set(),
    scores: {},
    totalScore: 0,
    startTime: null
};

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    renderAppList();
    bindEvents();
    updateTime();
    setInterval(updateTime, 60000); // 每分钟更新一次时间
});

// 渲染应用列表
function renderAppList() {
    const appList = document.getElementById('appList');
    appList.innerHTML = scenes.map(scene => `
        <div class="app-item" data-scene-id="${scene.id}">
            <div class="app-icon">${scene.icon}</div>
            <div class="app-info">
                <div class="app-name">${scene.name}</div>
                <div class="app-desc">${scene.description}</div>
            </div>
            <div class="app-status"></div>
        </div>
    `).join('');
}

// 绑定事件
function bindEvents() {
    // 开始按钮
    document.getElementById('startDayBtn').addEventListener('click', startDay);
    
    // 应用列表点击
    document.getElementById('appList').addEventListener('click', (e) => {
        const appItem = e.target.closest('.app-item');
        if (appItem && !appItem.classList.contains('completed')) {
            const sceneId = appItem.dataset.sceneId;
            openScene(sceneId);
        }
    });
    
    // 关闭场景
    document.getElementById('closeSceneBtn').addEventListener('click', closeScene);
    
    // 重置按钮
    document.getElementById('resetBtn').addEventListener('click', resetDay);
    
    // 重新开始
    document.getElementById('restartBtn').addEventListener('click', resetDay);
    
    // 继续按钮 - 不再全局绑定，由 showFeedback / showChatCoach 动态设置 onclick
    // document.getElementById('continueBtn').addEventListener('click', closeFeedback);
}

// 开始一天
function startDay() {
    state.startTime = new Date();
    document.getElementById('welcomeScreen').style.display = 'none';
    document.getElementById('sceneWindow').style.display = 'block';
    
    // 自动打开第一个场景
    openScene(scenes[0].id);
}

// 打开场景
function openScene(sceneId) {
    const scene = scenes.find(s => s.id === sceneId);
    if (!scene) return;
    
    state.currentScene = scene;
    
    // 更新窗口标题
    document.getElementById('windowTitle').textContent = `${scene.icon} ${scene.name}`;
    
    // 渲染场景内容
    const content = document.getElementById('windowContent');
    content.innerHTML = renderSceneContent(scene);
    
    // 显示场景窗口
    document.getElementById('welcomeScreen').style.display = 'none';
    document.getElementById('completeScreen').style.display = 'none';
    document.getElementById('sceneWindow').style.display = 'block';
    
    // 更新应用列表状态
    updateAppListState();
    
    // 更新时间
    document.getElementById('currentTime').textContent = scene.time;
    
    // 如果是聊天场景，渲染初始消息和选项
    if (scene.type === 'chat-conversation') {
        setTimeout(() => {
            renderChatMessages();
            renderChatOptions();
        }, 100);
    }
}

// 渲染攻略区（方案A+D）
function renderGuide(guide) {
    if (!guide) return '';
    const escapedDetails = guide.details.replace(/`/g, '\\`').replace(/\$/g, '\\$');
    return `
        <div class="guide-section">
            <div class="guide-bar" onclick="toggleGuide(this)">
                <span class="guide-icon">💡</span>
                <span class="guide-summary">${guide.summary}</span>
                <span class="guide-toggle">查看攻略 ▾</span>
            </div>
            <div class="guide-details" style="display:none;">
                <div class="guide-content">${guide.details}</div>
            </div>
        </div>
    `;
}

// 攻略展开/折叠
function toggleGuide(el) {
    const details = el.nextElementSibling;
    const toggle = el.querySelector('.guide-toggle');
    if (details.style.display === 'none') {
        details.style.display = 'block';
        toggle.textContent = '收起攻略 ▴';
        el.classList.add('expanded');
    } else {
        details.style.display = 'none';
        toggle.textContent = '查看攻略 ▾';
        el.classList.remove('expanded');
    }
}

// 对话状态（新版轮次制）
// （保留原有 chatState 变量供旧引用兼容）

// 渲染场景内容
function renderSceneContent(scene) {
    let html = `
        <div class="scene-header">
            <div class="scene-title">${scene.icon} ${scene.name}</div>
        </div>
        <div class="scene-context">${scene.context}</div>
        <div class="task-section">
    `;
    
    // 单步骤表单的攻略（方案A+D）
    if (scene.type === 'form' && scene.guide) {
        html += renderGuide(scene.guide);
        html += `<div class="task-title">${scene.task.title}</div>`;
    }
    
    if (scene.type === 'form') {
        html += renderFormFields(scene.task.fields);
        html += `<button class="btn-submit" onclick="submitForm()">提交</button>`;
    } else if (scene.type === 'multi-step-form') {
        html += renderMultiStepForm(scene);
    } else if (scene.type === 'choice') {
        html += renderChoices(scene.task.choices);
    } else if (scene.type === 'chat-conversation') {
        html += renderChatConversation(scene);
    }
    
    html += `</div>`;
    return html;
}

// 渲染多步骤表单
function renderMultiStepForm(scene) {
    const steps = scene.task.steps;
    let html = `
        <div class="multi-step-form">
            <div class="step-indicator">
                ${steps.map((step, index) => `
                    <div class="step-item" data-step="${index}">
                        <div class="step-number">${index + 1}</div>
                        <div class="step-label">${step.title}</div>
                    </div>
                `).join('')}
            </div>
            <div class="step-content" id="stepContent">
                ${renderStepFields(steps[0])}
            </div>
            <div class="step-navigation">
                <button class="btn-prev" id="btnPrev" onclick="prevStep()" disabled>上一步</button>
                <button class="btn-next" id="btnNext" onclick="nextStep()">下一步</button>
                <button class="btn-submit" id="btnSubmit" onclick="submitMultiStepForm()" style="display:none;">提交</button>
            </div>
        </div>
    `;
    return html;
}

// 渲染步骤字段
function renderStepFields(step) {
    let html = `<div class="step-fields">`;
    if (step.guide) {
        html += renderGuide(step.guide);
    }
    html += renderFormFields(step.fields);
    html += `</div>`;
    return html;
}

// 当前步骤索引
let currentStepIndex = 0;

// 下一步
function nextStep() {
    const scene = state.currentScene;
    const steps = scene.task.steps;
    if (!validateStep(steps[currentStepIndex])) return;
    let nextIndex = currentStepIndex + 1;
    while (nextIndex < steps.length - 1) {
        const nextStep = steps[nextIndex];
        if (nextStep.showWhen && !shouldShowStep(nextStep)) { nextIndex++; } else { break; }
    }
    if (nextIndex < steps.length) { currentStepIndex = nextIndex; updateStepDisplay(); }
}

// 上一步
function prevStep() {
    const scene = state.currentScene;
    const steps = scene.task.steps;
    if (currentStepIndex > 0) {
        let prevIndex = currentStepIndex - 1;
        while (prevIndex > 0) {
            const prevStep = steps[prevIndex];
            if (prevStep.showWhen && !shouldShowStep(prevStep)) { prevIndex--; } else { break; }
        }
        currentStepIndex = prevIndex;
        updateStepDisplay();
    }
}

// 判断步骤是否应该显示
function shouldShowStep(step) {
    if (!step.showWhen) return true;
    for (const [fieldName, requiredValues] of Object.entries(step.showWhen)) {
        const field = document.querySelector(`[name="${fieldName}"]`);
        if (field && !requiredValues.includes(field.value)) return false;
    }
    return true;
}

// 更新步骤显示
function updateStepDisplay() {
    const scene = state.currentScene;
    const steps = scene.task.steps;
    const stepContent = document.getElementById('stepContent');
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');
    const btnSubmit = document.getElementById('btnSubmit');
    const stepItems = document.querySelectorAll('.step-item');
    stepItems.forEach((item, index) => {
        item.classList.remove('active', 'completed');
        if (index < currentStepIndex) item.classList.add('completed');
        else if (index === currentStepIndex) item.classList.add('active');
    });
    stepContent.innerHTML = renderStepFields(steps[currentStepIndex]);
    btnPrev.disabled = currentStepIndex === 0;
    if (currentStepIndex === steps.length - 1) {
        btnNext.style.display = 'none'; btnSubmit.style.display = 'inline-block';
    } else {
        btnNext.style.display = 'inline-block'; btnSubmit.style.display = 'none';
    }
    const categoryField = document.querySelector('[name="category"]');
    if (categoryField) categoryField.addEventListener('change', onCategoryChange);
}

// 产品类别变化处理
function onCategoryChange(e) {
    const scene = state.currentScene;
    const steps = scene.task.steps;
    const stepItems = document.querySelectorAll('.step-item');
    stepItems.forEach((item, index) => {
        const step = steps[index];
        if (step.showWhen) {
            item.style.display = shouldShowStep(step) ? 'flex' : 'none';
        } else {
            item.style.display = 'flex';
        }
    });
}

// 验证步骤
function validateStep(step) {
    for (const field of step.fields) {
        if (field.required) {
            const input = document.querySelector(`[name="${field.name}"]`);
            if (!input || !input.value || input.value === '请选择' || input.value === '请选择产品类别') {
                alert(`请填写必填项：${field.label}`);
                input.focus();
                return false;
            }
        }
    }
    return true;
}

// 提交多步骤表单
function submitMultiStepForm() {
    const scene = state.currentScene;
    const steps = scene.task.steps;
    const formData = {};
    steps.forEach(step => {
        step.fields.forEach(field => {
            const input = document.querySelector(`[name="${field.name}"]`);
            if (input) {
                if (field.type === 'checkbox-group') {
                    formData[field.name] = Array.from(document.querySelectorAll(`[name="${field.name}"]:checked`)).map(cb => cb.value);
                } else {
                    formData[field.name] = input.value.trim();
                }
            }
        });
    });
    const missingFields = [];
    steps.forEach(step => {
        step.fields.forEach(field => {
            if (field.required && !formData[field.name]) missingFields.push(field.label);
        });
    });
    if (missingFields.length > 0) { alert(`请填写完整：${missingFields.join(', ')}`); return; }
    const result = scene.scoring(formData);
    completeScene(result.score, result.feedback, result.tips);
}

// 渲染表单字段
function renderFormFields(fields) {
    return fields.map(field => {
        let inputHtml = '';
        if (field.type === 'input') {
            inputHtml = `<input type="text" class="form-input" name="${field.name}" placeholder="${field.placeholder || ''}" ${field.required ? 'required' : ''}>`;
        } else if (field.type === 'textarea') {
            inputHtml = `<textarea class="form-textarea" name="${field.name}" placeholder="${field.placeholder || ''}" ${field.required ? 'required' : ''}></textarea>`;
        } else if (field.type === 'select') {
            inputHtml = `<select class="form-select" name="${field.name}" ${field.required ? 'required' : ''}>${field.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}</select>`;
        } else if (field.type === 'checkbox-group') {
            inputHtml = `<div class="checkbox-group">${field.options.map(opt => `<div class="checkbox-item"><input type="checkbox" id="${field.name}_${opt}" name="${field.name}" value="${opt}"><label for="${field.name}_${opt}">${opt}</label></div>`).join('')}</div>`;
        }
        let helpHtml = field.help ? `<div class="form-help">${field.help}</div>` : '';
        return `<div class="form-group"><label class="form-label">${field.label}</label>${inputHtml}${helpHtml}</div>`;
    }).join('');
}

// 对话状态（新版轮次制）
let chatState = {
    currentRound: 0,
    trust: 50,
    patience: 3,
    consecutivePoor: 0,
    selectedOptions: [],
    terminated: false
};

// 渲染对话聊天场景
function renderChatConversation(scene) {
    chatState = {
        currentRound: 0,
        trust: scene.conversation.initialTrust,
        patience: scene.conversation.initialPatience,
        consecutivePoor: 0,
        selectedOptions: [],
        terminated: false
    };

    let html = `
        <div class="chat-container">
            <div class="chat-header-bar">
                <div class="chat-customer-info">
                    <div class="chat-avatar">${scene.conversation.customerAvatar || '👤'}</div>
                    <div>
                        <div class="chat-customer-name">${scene.conversation.customerName}</div>
                        <div class="chat-customer-company">${scene.conversation.customerCompany}</div>
                    </div>
                </div>
                <div class="chat-meters">
                    <div class="chat-trust-meter">
                        <span class="trust-label">信任度</span>
                        <div class="trust-bar-bg">
                            <div class="trust-bar-fill" id="trustBarFill" style="width: ${chatState.trust}%"></div>
                        </div>
                        <span class="trust-value" id="trustValue">${chatState.trust}</span>
                    </div>
                    <div class="chat-patience-meter">
                        <span class="patience-label">耐心</span>
                        <span class="patience-hearts" id="patienceHearts">${'❤️'.repeat(chatState.patience)}${'🖤'.repeat(scene.conversation.initialPatience - chatState.patience)}</span>
                    </div>
                </div>
            </div>
            <div class="chat-messages" id="chatMessages"></div>
            <div class="chat-options" id="chatOptions"></div>
        </div>
    `;
    return html;
}

// 渲染聊天消息历史
function renderChatMessages() {
    const scene = state.currentScene;
    const rounds = scene.conversation.rounds;
    const messagesEl = document.getElementById('chatMessages');

    let html = '';
    for (let i = 0; i < chatState.currentRound; i++) {
        const round = rounds[i];
        html += `
            <div class="chat-msg customer-msg">
                <div class="msg-avatar">${scene.conversation.customerAvatar || '👤'}</div>
                <div class="msg-bubble">${round.customerMessage}</div>
            </div>
        `;
        const selected = chatState.selectedOptions.find(o => o.roundId === round.id);
        if (selected) {
            html += `
                <div class="chat-msg user-msg">
                    <div class="msg-bubble">${selected.text}</div>
                    <div class="msg-avatar self">💼</div>
                </div>
            `;
        }
    }

    // 当前轮客户消息
    if (chatState.currentRound < rounds.length && !chatState.terminated) {
        const currentRound = rounds[chatState.currentRound];
        html += `
            <div class="chat-msg customer-msg typing-anim">
                <div class="msg-avatar">${scene.conversation.customerAvatar || '👤'}</div>
                <div class="msg-bubble">${currentRound.customerMessage}</div>
            </div>
        `;
    }

    // 提前终止消息
    if (chatState.terminated) {
        const term = scene.conversation.earlyTermination;
        html += `
            <div class="chat-msg customer-msg terminated-msg">
                <div class="msg-avatar">${scene.conversation.customerAvatar || '👤'}</div>
                <div class="msg-bubble">${term.customerMessage}</div>
            </div>
        `;
    }

    messagesEl.innerHTML = html;
    messagesEl.scrollTop = messagesEl.scrollHeight;
}

// 渲染聊天选项
function renderChatOptions() {
    const scene = state.currentScene;
    const rounds = scene.conversation.rounds;
    const optionsEl = document.getElementById('chatOptions');

    if (chatState.terminated || chatState.currentRound >= rounds.length) {
        optionsEl.innerHTML = '';
        return;
    }

    const round = rounds[chatState.currentRound];
    const roundNum = chatState.currentRound + 1;
    const totalRounds = rounds.length;

    let html = `<div class="options-title">第 ${roundNum}/${totalRounds} 轮 — 选择你的回复：</div>`;
    html += '<div class="chat-choice-list">';
    round.options.forEach(opt => {
        html += `
            <div class="chat-choice-item" onclick="selectChatOption('${opt.id}')">
                <div class="choice-letter">${opt.id.toUpperCase()}</div>
                <div class="choice-text">${opt.text}</div>
            </div>
        `;
    });
    html += '</div>';
    optionsEl.innerHTML = html;
}

// 选择聊天选项
function selectChatOption(optionId) {
    const scene = state.currentScene;
    const round = scene.conversation.rounds[chatState.currentRound];
    const selectedOpt = round.options.find(o => o.id === optionId);
    if (!selectedOpt) return;

    // 记录选择
    chatState.selectedOptions.push({
        roundId: round.id,
        optionId: optionId,
        text: selectedOpt.text,
        trustChange: selectedOpt.trustChange,
        quality: selectedOpt.quality
    });

    // 更新信任度
    chatState.trust = Math.max(0, Math.min(130, chatState.trust + selectedOpt.trustChange));

    // 更新耐心值
    if (selectedOpt.quality === 'poor') {
        chatState.consecutivePoor++;
        if (chatState.consecutivePoor >= 2) {
            chatState.patience = Math.max(0, chatState.patience - 1);
            chatState.consecutivePoor = 0;
        }
    } else {
        chatState.consecutivePoor = 0;
    }

    updateChatMeters();

    // 检查耐心值是否耗尽
    if (chatState.patience <= 0) {
        chatState.terminated = true;
        showChatCoach(selectedOpt, true);
        return;
    }

    showChatCoach(selectedOpt, false);
}

// 更新仪表盘
function updateChatMeters() {
    const fill = document.getElementById('trustBarFill');
    const value = document.getElementById('trustValue');
    const hearts = document.getElementById('patienceHearts');

    const displayTrust = Math.min(100, chatState.trust);
    if (fill) fill.style.width = displayTrust + '%';
    if (value) value.textContent = chatState.trust;

    if (hearts) {
        const maxP = state.currentScene.conversation.initialPatience;
        hearts.innerHTML = '❤️'.repeat(Math.max(0, chatState.patience)) + '🖤'.repeat(Math.max(0, maxP - chatState.patience));
    }
}

// 显示教练点评（双角色系统）
function showChatCoach(option, willTerminate) {
    const modal = document.getElementById('feedbackModal');
    const icon = document.getElementById('feedbackIcon');
    const title = document.getElementById('feedbackTitle');
    const scoreEl = document.getElementById('feedbackScore');
    const messageEl = document.getElementById('feedbackMessage');
    const tipsEl = document.getElementById('feedbackTips');

    // 根据回复质量设置图标和标题
    if (option.quality === 'excellent') {
        icon.textContent = '🌟';
        title.textContent = '出色回复！';
    } else if (option.quality === 'average') {
        icon.textContent = '⚠️';
        title.textContent = '一般回复';
    } else {
        icon.textContent = '🚨';
        title.textContent = '不当回复';
    }

    // 信任度变化
    const changeText = option.trustChange >= 0 ? `+${option.trustChange}` : `${option.trustChange}`;
    scoreEl.textContent = `信任度 ${changeText}`;
    scoreEl.className = 'feedback-score' + (option.trustChange < 0 ? ' negative' : '');

    messageEl.textContent = '';

    // 教练面板（双角色：评估 + 心理 + 策略）
    let tipsHtml = `<div class="coach-panel">`;

    // 答复评估
    tipsHtml += `
        <div class="coach-section">
            <div class="coach-section-title">📋 答复评估</div>
            <div class="coach-section-content">${option.coachEvaluation}</div>
        </div>
    `;

    // 客户心理分析
    tipsHtml += `
        <div class="coach-section">
            <div class="coach-section-title">🧠 客户心理</div>
            <div class="coach-section-content">${option.coachPsychology}</div>
        </div>
    `;

    // 后续策略
    tipsHtml += `
        <div class="coach-section">
            <div class="coach-section-title">🎯 后续策略</div>
            <div class="coach-section-content">${option.coachStrategy}</div>
        </div>
    `;

    // 状态栏
    tipsHtml += `
        <div class="coach-status">
            <span>信任度：${chatState.trust}</span>
            <span>耐心：${'❤️'.repeat(chatState.patience)}${'🖤'.repeat(state.currentScene.conversation.initialPatience - chatState.patience)}</span>
        </div>
    `;

    if (willTerminate) {
        tipsHtml += `
            <div class="coach-warning">
                ⚠️ 客户已失去耐心，即将终止对话！连续的不当回复让客户判定你不是合适的合作伙伴。
            </div>
        `;
    }

    tipsHtml += `</div>`;
    tipsEl.innerHTML = tipsHtml;

    modal.style.display = 'flex';

    document.getElementById('continueBtn').onclick = () => {
        closeChatCoach(willTerminate);
    };
}

// 关闭教练点评，进入下一轮
function closeChatCoach(willTerminate) {
    document.getElementById('feedbackModal').style.display = 'none';

    if (willTerminate || chatState.terminated) {
        showChatResult();
        return;
    }

    chatState.currentRound++;
    const scene = state.currentScene;
    const rounds = scene.conversation.rounds;

    if (chatState.currentRound >= rounds.length) {
        showChatResult();
    } else {
        renderChatMessages();
        renderChatOptions();
    }
}

// 显示最终结果（四维评分）
function showChatResult() {
    const scene = state.currentScene;
    const outcomes = scene.conversation.outcomes;
    let outcome;

    if (chatState.terminated) {
        outcome = outcomes.terminated;
    } else if (chatState.trust >= outcomes.excellent.minTrust) {
        outcome = outcomes.excellent;
    } else if (chatState.trust >= outcomes.good.minTrust) {
        outcome = outcomes.good;
    } else if (outcomes.comparison && chatState.trust >= outcomes.comparison.minTrust) {
        outcome = outcomes.comparison;
    } else {
        outcome = outcomes.lost;
    }

    const modal = document.getElementById('feedbackModal');
    const icon = document.getElementById('feedbackIcon');
    const title = document.getElementById('feedbackTitle');
    const scoreEl = document.getElementById('feedbackScore');
    const messageEl = document.getElementById('feedbackMessage');
    const tipsEl = document.getElementById('feedbackTips');

    icon.textContent = outcome.emoji || '📊';
    title.textContent = outcome.title;
    scoreEl.textContent = `最终信任度：${chatState.trust}`;
    scoreEl.className = 'feedback-score' + (chatState.trust < 60 ? ' negative' : '');
    messageEl.textContent = outcome.desc;

    // 构建四维评分条
    let tipsHtml = '';
    if (outcome.dimensions) {
        const dims = outcome.dimensions;
        tipsHtml += `
            <div class="dimension-scores">
                <div class="dimension-title">📊 四维能力评分</div>
                <div class="dimension-item">
                    <span class="dim-label">专业度</span>
                    <div class="dim-bar-bg"><div class="dim-bar-fill" style="width:${dims.professionalism}%;background:#2196f3;"></div></div>
                    <span class="dim-value">${dims.professionalism}</span>
                </div>
                <div class="dimension-item">
                    <span class="dim-label">诚信度</span>
                    <div class="dim-bar-bg"><div class="dim-bar-fill" style="width:${dims.integrity}%;background:#4caf50;"></div></div>
                    <span class="dim-value">${dims.integrity}</span>
                </div>
                <div class="dimension-item">
                    <span class="dim-label">主动性</span>
                    <div class="dim-bar-bg"><div class="dim-bar-fill" style="width:${dims.initiative}%;background:#ff9800;"></div></div>
                    <span class="dim-value">${dims.initiative}</span>
                </div>
                <div class="dimension-item">
                    <span class="dim-label">信任建立</span>
                    <div class="dim-bar-bg"><div class="dim-bar-fill" style="width:${dims.trustBuilding}%;background:#9c27b0;"></div></div>
                    <span class="dim-value">${dims.trustBuilding}</span>
                </div>
            </div>
        `;
    }

    // 整体分析
    tipsHtml += `
        <div class="result-section">
            <div class="result-section-title">🔍 整体分析</div>
            <div class="result-section-content">${outcome.analysis}</div>
        </div>
    `;

    // 改进措施
    tipsHtml += `
        <div class="result-section">
            <div class="result-section-title">📝 改进措施</div>
            <ul class="improvement-list">
                ${outcome.improvements.map(imp => `<li>${imp}</li>`).join('')}
            </ul>
        </div>
    `;

    // 对话回顾
    tipsHtml += `
        <div class="result-section">
            <div class="result-section-title">📜 对话回顾</div>
            <div class="round-history">
                ${chatState.selectedOptions.map((opt, i) => {
                    const changeIcon = opt.quality === 'excellent' ? '🌟' : opt.quality === 'average' ? '⚠️' : '🚨';
                    const changeText = opt.trustChange >= 0 ? `+${opt.trustChange}` : `${opt.trustChange}`;
                    return `<div class="history-item">${changeIcon} 第${i+1}轮：信任度 ${changeText}</div>`;
                }).join('')}
            </div>
        </div>
    `;

    tipsEl.innerHTML = tipsHtml;
    modal.style.display = 'flex';

    // 覆盖继续按钮
    document.getElementById('continueBtn').onclick = () => {
        document.getElementById('feedbackModal').style.display = 'none';
        const finalScore = Math.min(100, Math.max(0, chatState.trust));
        state.scores[scene.id] = finalScore;
        state.totalScore = Object.values(state.scores).reduce((sum, s) => sum + s, 0);
        state.completedScenes.add(scene.id);
        document.getElementById('totalScore').textContent = state.totalScore;
        document.getElementById('completedCount').textContent = `${state.completedScenes.size}/5`;
        updateAppListState();

        if (state.completedScenes.size === scenes.length) {
            showCompleteScreen();
        } else {
            const nextScene = scenes.find(s => !state.completedScenes.has(s.id));
            if (nextScene) openScene(nextScene.id);
        }
    };
}

// 渲染选项
function renderChoices(choices) {
    return `
        <div class="choice-list">
            ${choices.map(choice => `
                <div class="choice-item" data-choice-id="${choice.id}" onclick="selectChoice('${choice.id}')">
                    ${choice.text}
                </div>
            `).join('')}
        </div>
    `;
}

// 选择选项
function selectChoice(choiceId) {
    const choiceItems = document.querySelectorAll('.choice-item');
    choiceItems.forEach(item => item.classList.remove('selected'));
    
    const selectedItem = document.querySelector(`[data-choice-id="${choiceId}"]`);
    if (selectedItem) {
        selectedItem.classList.add('selected');
        
        // 立即评分
        const scene = state.currentScene;
        const choice = scene.task.choices.find(c => c.id === choiceId);
        
        setTimeout(() => {
            completeScene(choice.score, choice.feedback, []);
        }, 300);
    }
}

// 提交表单
function submitForm() {
    const scene = state.currentScene;
    const formData = {};
    
    // 收集表单数据
    scene.task.fields.forEach(field => {
        const input = document.querySelector(`[name="${field.name}"]`);
        if (input) {
            formData[field.name] = input.value.trim();
        }
    });
    
    // 验证必填字段
    const missingFields = scene.task.fields.filter(f => f.required && !formData[f.name]);
    if (missingFields.length > 0) {
        alert(`请填写完整：${missingFields.map(f => f.label).join(', ')}`);
        return;
    }
    
    // 评分
    const result = scene.scoring(formData);
    completeScene(result.score, result.feedback, result.tips);
}

// 完成场景
function completeScene(score, feedback, tips) {
    const scene = state.currentScene;
    
    // 记录分数
    state.scores[scene.id] = score;
    state.totalScore = Object.values(state.scores).reduce((sum, s) => sum + s, 0);
    state.completedScenes.add(scene.id);
    
    // 更新 UI
    document.getElementById('totalScore').textContent = state.totalScore;
    document.getElementById('completedCount').textContent = `${state.completedScenes.size}/5`;
    
    // 显示反馈
    showFeedback(score, feedback, tips);
    
    // 更新应用列表
    updateAppListState();
}

// 显示反馈
function showFeedback(score, feedback, tips) {
    const modal = document.getElementById('feedbackModal');
    const icon = document.getElementById('feedbackIcon');
    const title = document.getElementById('feedbackTitle');
    const scoreEl = document.getElementById('feedbackScore');
    const messageEl = document.getElementById('feedbackMessage');
    const tipsEl = document.getElementById('feedbackTips');
    
    // 根据分数设置样式
    if (score >= 80) {
        icon.textContent = '✅';
        title.textContent = '任务完成';
        scoreEl.textContent = `+${score} 分`;
        scoreEl.classList.remove('negative');
    } else if (score >= 60) {
        icon.textContent = '⚠️';
        title.textContent = '基本完成';
        scoreEl.textContent = `+${score} 分`;
        scoreEl.classList.remove('negative');
    } else {
        icon.textContent = '❌';
        title.textContent = '需要改进';
        scoreEl.textContent = `${score} 分`;
        scoreEl.classList.add('negative');
    }
    
    messageEl.textContent = feedback;
    
    // 建议
    tipsEl.innerHTML = `
        <div class="tips-title">💡 改进建议</div>
        <ul class="tips-list">
            ${tips.map(tip => `<li>${tip}</li>`).join('')}
        </ul>
    `;
    
    modal.style.display = 'flex';

    // 设置继续按钮（非聊天场景走 closeFeedback）
    document.getElementById('continueBtn').onclick = closeFeedback;
}

// 关闭反馈
function closeFeedback() {
    document.getElementById('feedbackModal').style.display = 'none';
    
    // 检查是否完成所有任务
    if (state.completedScenes.size === scenes.length) {
        showCompleteScreen();
    }
    // 不再自动跳转，让用户手动选择下一个场景
}

// 显示完成界面
function showCompleteScreen() {
    document.getElementById('sceneWindow').style.display = 'none';
    document.getElementById('completeScreen').style.display = 'block';
    
    // 最终分数
    document.getElementById('finalScore').textContent = state.totalScore;
    
    // 评级
    const avgScore = state.totalScore / scenes.length;
    let rating = '';
    let ratingDesc = '';
    
    if (avgScore >= 80) {
        rating = '🌟 优秀外贸员';
        ratingDesc = '你展现出了专业的外贸业务能力，客户开发和沟通都很出色！';
    } else if (avgScore >= 60) {
        rating = '👍 合格外贸员';
        ratingDesc = '基本掌握了外贸业务技能，继续学习和实践，你会更优秀！';
    } else {
        rating = '📚 需要继续学习';
        ratingDesc = '建议多学习外贸业务知识，参考优秀同事的做法，不断提升自己。';
    }
    
    document.getElementById('performanceRating').innerHTML = `
        <div class="rating-title">${rating}</div>
        <div class="rating-desc">${ratingDesc}</div>
    `;
    
    // 总结
    const summaryHtml = scenes.map(scene => {
        const score = state.scores[scene.id] || 0;
        return `
            <div class="summary-item">
                <span>${scene.icon} ${scene.name}</span>
                <span>${score} 分</span>
            </div>
        `;
    }).join('');
    
    document.getElementById('performanceSummary').innerHTML = summaryHtml;
}

// 关闭场景
function closeScene() {
    document.getElementById('sceneWindow').style.display = 'none';
    document.getElementById('welcomeScreen').style.display = 'block';
    state.currentScene = null;
}

// 更新应用列表状态
function updateAppListState() {
    const appItems = document.querySelectorAll('.app-item');
    appItems.forEach(item => {
        const sceneId = item.dataset.sceneId;
        const statusEl = item.querySelector('.app-status');
        
        if (state.completedScenes.has(sceneId)) {
            item.classList.add('completed');
            item.classList.remove('active');
            statusEl.textContent = '✅';
        } else if (state.currentScene && state.currentScene.id === sceneId) {
            item.classList.add('active');
            item.classList.remove('completed');
            statusEl.textContent = '🔵';
        } else {
            item.classList.remove('active', 'completed');
            statusEl.textContent = '';
        }
    });
}

// 重置一天
function resetDay() {
    if (confirm('确定要重新开始吗？当前进度会被清除。')) {
        state.currentScene = null;
        state.completedScenes.clear();
        state.scores = {};
        state.totalScore = 0;
        state.startTime = null;
        
        document.getElementById('totalScore').textContent = '0';
        document.getElementById('completedCount').textContent = '0/5';
        document.getElementById('currentTime').textContent = '09:00';
        
        document.getElementById('welcomeScreen').style.display = 'block';
        document.getElementById('sceneWindow').style.display = 'none';
        document.getElementById('completeScreen').style.display = 'none';
        
        updateAppListState();
    }
}

// 更新时间
function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('currentTime').textContent = `${hours}:${minutes}`;
    
    const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    document.getElementById('currentDate').textContent = days[now.getDay()];
}
