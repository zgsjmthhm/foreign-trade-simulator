// 场景数据定义
const scenes = [
    {
        id: 'publish-product',
        name: '发布产品',
        icon: '📦',
        description: '在阿里巴巴国际站发布产品',
        time: '09:30',
        type: 'multi-step-form',
        context: `
            <strong> 任务背景</strong><br>
            公司主营产品：工业吊装设备（拉紧器、柔性吊带、扁平吊带）<br>
            目标市场：德国及欧洲<br>
            你需要在阿里巴巴国际站发布一个产品，吸引德国客户询盘。<br><br>
            <strong>️ 注意：</strong>拉紧器和吊带的产品属性不同，请选择正确的产品类别并填写对应属性。
        `,
        task: {
            title: '📝 阿里巴巴国际站 - 发布产品',
            steps: [
                {
                    id: 'basic',
                    title: '① 基础信息',
                    guide: {
                        summary: '产品类别决定后续填写的属性字段，标题和关键词影响搜索排名',
                        details: `
**必填项说明**
- **产品类别**：拉紧器、柔性吊带、扁平吊带的属性完全不同，选错会导致后续字段不对
- **产品标题**：不超过128字符，包含产品名+核心参数（WLL、长度等）+应用场景
- **关键词**：最多3个，用逗号分隔，覆盖客户可能搜索的不同词汇
- **产品类型**：现货适合小批量快速出货，定制适合大客户长期合作

**填写技巧**
- 标题公式：核心词 + 参数 + 应用场景，例如 "Heavy Duty Ratchet Strap 50mm WLL 2500kg for Cargo Lashing"
- 关键词要多样化：ratchet strap, lashing belt, tie down strap（同义词覆盖）
- 德国客户搜索习惯：偏好带参数和认证的标题

**常见错误**
- ❌ 标题太短："Ratchet Strap" → ✅ "Heavy Duty Ratchet Lashing Strap 50mm WLL 2500kg"
- ❌ 关键词重复："strap, ratchet strap, lashing strap" → ✅ "ratchet strap, cargo lashing, tie down belt"
- ❌ 类别选错导致后续属性无法填写
                        `
                    },
                    fields: [
                        {
                            type: 'select',
                            name: 'category',
                            label: '产品类别 (Product Category)',
                            options: ['请选择产品类别', '拉紧器/捆绑带 (Ratchet Lashing Straps)', '柔性吊带 (Round Slings)', '扁平吊带 (Flat Webbing Slings)'],
                            required: true,
                            dynamic: true
                        },
                        {
                            type: 'input',
                            name: 'title',
                            label: '产品标题 (Product Title)',
                            placeholder: '例如：Heavy Duty Ratchet Tie Down Strap 50mm WLL 2500kg',
                            required: true
                        },
                        {
                            type: 'input',
                            name: 'keywords',
                            label: '产品关键词 (Keywords)',
                            placeholder: '例如：ratchet strap, lashing belt, tie down',
                            required: true
                        },
                        {
                            type: 'select',
                            name: 'product_type',
                            label: '产品类型 (Product Type)',
                            options: ['请选择', '现货 (Ready to Ship)', '定制 (Customization)', '现货+定制'],
                            required: true
                        }
                    ]
                },
                {
                    id: 'attributes-lashing',
                    title: '② 产品属性 - 拉紧器',
                    showWhen: { category: ['拉紧器/捆绑带 (Ratchet Lashing Straps)'] },
                    fields: [
                        {
                            type: 'select',
                            name: 'material',
                            label: '材质 (Material)',
                            options: ['请选择', '聚酯/Polyester', '尼龙/Nylon', '聚丙烯/Polypropylene'],
                            required: true
                        },
                        {
                            type: 'select',
                            name: 'width',
                            label: '宽度 (Width)',
                            options: ['请选择', '25mm', '35mm', '50mm', '75mm', '100mm'],
                            required: true
                        },
                        {
                            type: 'input',
                            name: 'length',
                            label: '长度 (Length)',
                            placeholder: '例如：6m, 8m, 10m, 12m',
                            required: true
                        },
                        {
                            type: 'select',
                            name: 'wll',
                            label: '工作负荷极限 (WLL)',
                            options: ['请选择', '500kg', '1000kg', '1500kg', '2500kg', '5000kg', '10000kg'],
                            required: true
                        },
                        {
                            type: 'select',
                            name: 'breaking_strength',
                            label: '破断强度 (Breaking Strength)',
                            options: ['请选择', '1000kg', '2000kg', '3000kg', '5000kg', '10000kg', '20000kg'],
                            required: true
                        },
                        {
                            type: 'select',
                            name: 'hook_type',
                            label: '端部配件 (End Fitting)',
                            options: ['请选择', 'J钩/J-Hook', 'S钩/S-Hook', '棘轮/Ratchet', '双钩/Double Hook', '无钩/No Hook'],
                            required: true
                        },
                        {
                            type: 'select',
                            name: 'safety_factor',
                            label: '安全系数 (Safety Factor)',
                            options: ['请选择', '2:1', '2.5:1', '3:1'],
                            required: true
                        },
                        {
                            type: 'checkbox-group',
                            name: 'certifications',
                            label: '认证证书 (Certifications)',
                            options: ['CE', 'GS', 'EN 12195-2', 'TUV', 'ISO 9001'],
                            required: true
                        },
                        {
                            type: 'input',
                            name: 'color',
                            label: '颜色 (Color)',
                            placeholder: '例如：蓝色/Blue, 橙色/Orange',
                            required: false
                        }
                    ]
                },
                {
                    id: 'attributes-round-sling',
                    title: '② 产品属性 - 柔性吊带',
                    showWhen: { category: ['柔性吊带 (Round Slings)'] },
                    fields: [
                        {
                            type: 'select',
                            name: 'color_capacity',
                            label: '颜色/吨位 (Color/Capacity)',
                            options: ['请选择', '紫色/1吨 (Purple/1t)', '绿色/2吨 (Green/2t)', '黄色/3吨 (Yellow/3t)', '灰色/4吨 (Grey/4t)', '红色/5吨 (Red/5t)', '棕色/6吨 (Brown/6t)', '橙色/8吨 (Orange/8t)', '红色+橙色/10吨 (Red+Orange/10t)'],
                            required: true,
                            help: '欧洲标准：不同颜色代表不同吨位'
                        },
                        {
                            type: 'input',
                            name: 'length',
                            label: '有效长度 (Effective Length)',
                            placeholder: '例如：1m, 2m, 3m, 5m, 10m',
                            required: true
                        },
                        {
                            type: 'select',
                            name: 'wll',
                            label: '工作负荷极限 (WLL)',
                            options: ['请选择', '1吨', '2吨', '3吨', '4吨', '5吨', '6吨', '8吨', '10吨'],
                            required: true
                        },
                        {
                            type: 'select',
                            name: 'safety_factor',
                            label: '安全系数 (Safety Factor)',
                            options: ['请选择', '6:1', '7:1', '8:1'],
                            required: true
                        },
                        {
                            type: 'select',
                            name: 'end_type',
                            label: '端部类型 (End Type)',
                            options: ['请选择', '环眼/Eye & Eye', '无限循环/Endless', '带保护套/With Sleeve'],
                            required: true
                        },
                        {
                            type: 'checkbox-group',
                            name: 'certifications',
                            label: '认证证书 (Certifications)',
                            options: ['CE', 'GS', 'EN 1492-2', 'TUV', 'ISO 9001'],
                            required: true
                        },
                        {
                            type: 'input',
                            name: 'core_material',
                            label: '芯材 (Core Material)',
                            placeholder: '例如：聚酯/Polyester',
                            required: false
                        },
                        {
                            type: 'input',
                            name: 'sleeve_material',
                            label: '保护套材质 (Sleeve Material)',
                            placeholder: '例如：聚酯/Polyester',
                            required: false
                        }
                    ]
                },
                {
                    id: 'attributes-flat-sling',
                    title: '② 产品属性 - 扁平吊带',
                    showWhen: { category: ['扁平吊带 (Flat Webbing Slings)'] },
                    fields: [
                        {
                            type: 'select',
                            name: 'material',
                            label: '材质 (Material)',
                            options: ['请选择', '聚酯/Polyester', '尼龙/Nylon', '聚丙烯/Polypropylene'],
                            required: true
                        },
                        {
                            type: 'select',
                            name: 'width',
                            label: '宽度 (Width)',
                            options: ['请选择', '25mm', '50mm', '75mm', '100mm', '150mm', '200mm', '300mm'],
                            required: true
                        },
                        {
                            type: 'input',
                            name: 'length',
                            label: '长度 (Length)',
                            placeholder: '例如：1m, 2m, 3m, 5m, 10m',
                            required: true
                        },
                        {
                            type: 'select',
                            name: 'wll',
                            label: '工作负荷极限 (WLL)',
                            options: ['请选择', '1吨', '2吨', '3吨', '4吨', '5吨', '6吨', '8吨', '10吨'],
                            required: true
                        },
                        {
                            type: 'select',
                            name: 'safety_factor',
                            label: '安全系数 (Safety Factor)',
                            options: ['请选择', '6:1', '7:1', '8:1'],
                            required: true
                        },
                        {
                            type: 'select',
                            name: 'end_type',
                            label: '端部类型 (End Type)',
                            options: ['请选择', '环眼/Eye & Eye', '无限循环/Endless', '带加强层/Reinforced'],
                            required: true
                        },
                        {
                            type: 'checkbox-group',
                            name: 'certifications',
                            label: '认证证书 (Certifications)',
                            options: ['CE', 'GS', 'EN 1492-1', 'TUV', 'ISO 9001'],
                            required: true
                        },
                        {
                            type: 'input',
                            name: 'color',
                            label: '颜色 (Color)',
                            placeholder: '例如：紫色/Purple, 绿色/Green',
                            required: false
                        }
                    ]
                },
                {
                    id: 'trade',
                    title: ' 交易信息',
                    fields: [
                        {
                            type: 'select',
                            name: 'price_type',
                            label: '报价方式 (Price Type)',
                            options: ['请选择', '按件计价 (Per Piece)', '按米计价 (Per Meter)', '按公斤计价 (Per KG)', '面议 (Negotiable)'],
                            required: true
                        },
                        {
                            type: 'input',
                            name: 'price_range',
                            label: '价格区间 (Price Range USD)',
                            placeholder: '例如：$5.00 - $15.00',
                            required: true
                        },
                        {
                            type: 'input',
                            name: 'moq',
                            label: '最小起订量 (MOQ)',
                            placeholder: '例如：500 Pieces',
                            required: true
                        },
                        {
                            type: 'select',
                            name: 'payment_terms',
                            label: '付款方式 (Payment Terms)',
                            options: ['请选择', 'T/T (电汇)', 'L/C (信用证)', 'T/T + L/C', 'Western Union', 'PayPal', '其他'],
                            required: true
                        },
                        {
                            type: 'input',
                            name: 'supply_capacity',
                            label: '供货能力 (Supply Ability)',
                            placeholder: '例如：100000 Pieces per Month',
                            required: true
                        },
                        {
                            type: 'input',
                            name: 'delivery_time',
                            label: '交期 (Delivery Time)',
                            placeholder: '例如：15-30 days after order confirmed',
                            required: true
                        }
                    ]
                },
                {
                    id: 'logistics',
                    title: '④ 物流信息',
                    fields: [
                        {
                            type: 'select',
                            name: 'shipping_method',
                            label: '运输方式 (Shipping Method)',
                            options: ['请选择', '海运 (Sea Freight)', '空运 (Air Freight)', '快递 (Express)', '铁路 (Railway)'],
                            required: true
                        },
                        {
                            type: 'input',
                            name: 'port',
                            label: '装运港 (Port of Loading)',
                            placeholder: '例如：Shanghai, Ningbo, Qingdao',
                            required: true
                        },
                        {
                            type: 'input',
                            name: 'lead_time',
                            label: '备货时间 (Lead Time)',
                            placeholder: '例如：7-15 days',
                            required: true
                        }
                    ]
                },
                {
                    id: 'packaging',
                    title: '⑤ 包装信息',
                    fields: [
                        {
                            type: 'input',
                            name: 'package_type',
                            label: '包装类型 (Package Type)',
                            placeholder: '例如：Carton, Bag, Box',
                            required: true
                        },
                        {
                            type: 'input',
                            name: 'package_size',
                            label: '包装尺寸 (Package Size)',
                            placeholder: '例如：50cm x 30cm x 20cm',
                            required: false
                        },
                        {
                            type: 'input',
                            name: 'gross_weight',
                            label: '毛重 (Gross Weight)',
                            placeholder: '例如：0.5 kg/piece',
                            required: false
                        }
                    ]
                },
                {
                    id: 'description',
                    title: '⑥ 产品详情',
                    fields: [
                        {
                            type: 'textarea',
                            name: 'description',
                            label: '产品描述 (Product Description)',
                            placeholder: '描述产品特点、应用场景、包装方式、交期等...\n\n提示：德国客户关注认证、技术参数、质量保障',
                            required: true
                        },
                        {
                            type: 'textarea',
                            name: 'highlights',
                            label: '产品亮点 (Product Highlights)',
                            placeholder: '列出3-5个核心卖点，例如：\n1. CE/GS认证，符合欧洲标准\n2. 高强度聚酯材质，耐用可靠\n3. 多种规格可选，满足不同需求',
                            required: true
                        }
                    ]
                },
                {
                    id: 'company',
                    title: '⑦ 公司资质',
                    fields: [
                        {
                            type: 'checkbox-group',
                            name: 'company_certs',
                            label: '公司认证 (Company Certifications)',
                            options: ['ISO 9001', 'ISO 14001', 'BSCI', 'SGS Audit', 'TUV Audit'],
                            required: false
                        },
                        {
                            type: 'input',
                            name: 'factory_size',
                            label: '工厂规模 (Factory Size)',
                            placeholder: '例如：5000 square meters',
                            required: false
                        },
                        {
                            type: 'input',
                            name: 'production_lines',
                            label: '生产线数量 (Production Lines)',
                            placeholder: '例如：5',
                            required: false
                        }
                    ]
                }
            ]
        },
        scoring: (data) => {
            let score = 0;
            let tips = [];
            
            // 标题评分 (15分)
            if (data.title) {
                const titleLower = data.title.toLowerCase();
                const keywords = ['ratchet', 'strap', 'lashing', 'tie down', 'belt', 'heavy duty', 'webbing', 'sling', 'round', 'flat'];
                const hasKeywords = keywords.filter(k => titleLower.includes(k)).length;
                
                if (hasKeywords >= 3) {
                    score += 12;
                } else if (hasKeywords >= 2) {
                    score += 8;
                    tips.push('标题关键词可以更丰富，建议包含产品类型和关键参数');
                } else {
                    score += 4;
                    tips.push('标题缺少核心关键词，德国客户搜索时可能找不到你的产品');
                }
                
                if (data.title.length >= 50 && data.title.length <= 128) {
                    score += 3;
                } else if (data.title.length < 50) {
                    tips.push('标题过短，建议补充产品规格（如WLL、长度等）');
                } else {
                    tips.push('标题过长，建议控制在128字符以内');
                }
            }
            
            // 关键词评分 (10分)
            if (data.keywords) {
                const keywordList = data.keywords.split(',').map(k => k.trim()).filter(k => k);
                if (keywordList.length >= 3) {
                    score += 10;
                } else if (keywordList.length >= 2) {
                    score += 7;
                    tips.push('建议填满3个关键词，增加搜索曝光');
                } else {
                    score += 3;
                    tips.push('关键词太少，建议用逗号分隔填写3个');
                }
            }
            
            // 产品属性评分 (25分)
            if (data.wll) {
                score += 10;
            } else {
                tips.push('WLL（工作负荷极限）是核心参数，必须填写');
            }
            
            if (data.length) {
                score += 5;
            }
            
            if (data.material || data.color_capacity) {
                score += 5;
            } else {
                tips.push('材质/颜色是重要属性，建议填写');
            }
            
            if (data.safety_factor) {
                score += 5;
            }
            
            // 认证评分 (15分)
            if (data.certifications) {
                const certs = Array.isArray(data.certifications) ? data.certifications : [data.certifications];
                const hasCE = certs.some(c => c.includes('CE'));
                const hasGS = certs.some(c => c.includes('GS'));
                const hasEN = certs.some(c => c.includes('EN'));
                
                if (hasCE && hasGS && hasEN) {
                    score += 15;
                } else if (hasCE && hasEN) {
                    score += 12;
                    tips.push('德国市场强烈建议添加GS认证，这是德国客户非常看重的');
                } else if (hasCE) {
                    score += 8;
                    tips.push('建议补充GS和EN标准认证，德国市场必需');
                } else {
                    score += 3;
                    tips.push('认证不完整！德国客户需要CE、GS、EN认证');
                }
            }
            
            // 描述评分 (15分)
            if (data.description) {
                const descLower = data.description.toLowerCase();
                const hasSpecs = descLower.includes('wll') || descLower.includes('working load') || descLower.includes('breaking strength') || descLower.includes('load capacity');
                const hasCert = descLower.includes('ce') || descLower.includes('gs') || descLower.includes('en') || descLower.includes('certification') || descLower.includes('certificate');
                const hasApplication = descLower.includes('application') || descLower.includes('use') || descLower.includes('cargo') || descLower.includes('lifting') || descLower.includes('transport');
                
                if (hasSpecs && hasCert && hasApplication) {
                    score += 10;
                } else if (hasSpecs && hasCert) {
                    score += 7;
                    tips.push('描述可以补充应用场景，让客户了解产品用途');
                } else if (hasSpecs || hasCert) {
                    score += 4;
                    if (!hasCert) tips.push('描述中应提及认证信息，德国客户非常看重');
                    if (!hasSpecs) tips.push('建议补充技术参数：WLL、破断强度等');
                } else {
                    score += 2;
                    tips.push('描述过于简单，需要包含：规格参数、认证、应用场景');
                }
                
                if (data.description.length >= 100 && data.description.length <= 800) {
                    score += 5;
                } else if (data.description.length < 100) {
                    tips.push('描述偏短，建议100-500字');
                }
            }
            
            // 产品亮点 (5分)
            if (data.highlights) {
                if (data.highlights.length >= 50) {
                    score += 5;
                } else {
                    score += 2;
                    tips.push('产品亮点建议列出3-5个核心卖点');
                }
            }
            
            // 交易信息评分 (15分)
            if (data.price_range) {
                score += 5;
                if (data.price_range.includes('$') || data.price_range.includes('USD')) {
                    score += 2;
                } else {
                    tips.push('价格应明确货币单位（USD）');
                }
            }
            
            if (data.moq) {
                score += 3;
            }
            
            if (data.payment_terms && data.payment_terms !== '请选择') {
                score += 3;
            }
            
            if (data.delivery_time) {
                score += 2;
            }
            
            // 物流信息 (5分)
            if (data.shipping_method && data.port) {
                score += 5;
            } else {
                tips.push('物流信息不完整，建议填写运输方式和装运港');
            }
            
            return {
                score: Math.min(score, 100),
                feedback: score >= 80 ? '产品发布质量很高！属性完整、认证齐全、描述专业，容易吸引德国客户询盘。' :
                         score >= 60 ? '基本合格，但某些属性或描述可以优化。' :
                         '产品信息不够完整，建议参考优秀同行的产品页面，补充关键参数和认证。',
                tips: tips.length > 0 ? tips : ['继续保持！产品信息很完整。']
            };
        }
    },
    
    {
        id: 'cold-email',
        name: '发送开发信',
        icon: '✉️',
        description: '给潜在客户发送开发信',
        time: '10:30',
        type: 'form',
        context: `
            <strong>📋 任务背景</strong><br>
            你通过展会收集到一家德国客户的名片：<br>
            公司名：Müller GmbH（德国中型物流公司）<br>
            主营业务：货物运输、仓储<br>
            潜在客户对拉紧器/捆绑带有采购需求<br>
            你需要写一封开发信，争取客户回复。
        `,
        guide: {
            summary: '开发信三段式：个性化开场 → 价值与钩子 → 行动号召，正文控制在90-100词',
            details: `
 开发信模板

 主题
Please Check Inquiry's Reply from XXX.

 开头
I'm Max Fan from Jiangsu Zhongyi Tools and Riggings Co., Ltd. We manufacture lifting & lashing gear for heavy cranes in mining, marine, and steel industries.

 中间

 面向一般客户（通用版）
Products we can support:
- Ratchet tie down straps, webbing slings, round slings (CE/BV/GS certified), tested to EN12195-2, EN1492-1
- Wire rope slings, shackles, lifting clamps
- Lifting nets, chains
All products are certified (CE/BV/GS) to meet high safety standards. OEM & custom solutions supported.

 面向商超采购
Why work with us:
Certified: Ratchet tie down straps, webbing slings, round slings (CE/BV/GS certified), tested to EN12195-2, EN1492-1.
Trusted: We already supply leading German supermarket chains with our cargo control gear — brand-name quality at factory-direct prices well below branded alternatives.
Flexible: OEM & custom solutions supported.

 面向造船公司
Why work with us:
Certified: Ratchet tie down straps, webbing slings, round slings (CE/BV/GS certified), tested to EN12195-2, EN1492-1.
Trusted: We already supply leading German supermarket chains with our cargo control gear — brand-name quality at factory-direct prices well below branded alternatives. COSCO uses our gear for global vessel lashing.
Flexible: OEM & custom solutions supported.

 结尾
Please contact me for any questions.
No pressure — just let me know in a quick 2-min reply.

 签名
XXX
Business Development Manager
Jiangsu Zhongyi Tools and Riggings Co., Ltd.
No.418 Jianggao avenue, Sixiang Street, Taizhou, Jiangsu, China
Tel: (+86) 15896007961
Web: https://jszhongyi.en.alibaba.com | https://www.js-zy.cn

---

 AI指令（完整模板）

 一、我的角色与任务
请你扮演一位资深外贸销售专家，擅长撰写高回复率的开发信。
你的核心任务是：基于我提供的固定公司信息和每次指定的目标网址，生成一封高度定制化、简洁有力的英文开发信，并附带分析报告。

 二、固定公司信息与销售政策（无需修改）
* 发件人姓名：Kiki
* 职位：Senior Marketing Specialist
* 公司名称：Zhongyi Tools and Rigging Co., Ltd.
* 品牌名：ZHONGYI

* 公司实力/信任背书：
  1. 制造实力：拥有12,410平方米智能化基地与16,000平方米全流程生产空间，配备124台无梭织机、自动拉带机等先进设备，实现自动化生产。
  2. 质量与认证：CE、TUV GS、BV船级社、ISO9001、GJB9001C-2017（军用标准），由中国人民保险公司承保。三级安全生产标准化企业。
  3. 技术研发：拥有行业泰斗级技术总监与资深团队，自主研发全自动打包机、无棘轮捆绑器等，推动技术迭代。
  4. 标杆客户：长期为中远海运（China COSCO SHIPPING）等国内头部国有企业及大型工程供货，是"隐形冠军"。
  5. 价格与质量：提供最便宜的价格与最高等级的商品质量安全保证。

* 核心产品线矩阵：
  - 捆绑收紧器系列：从1寸0.8T到4寸10T的全尺寸棘轮捆绑器（Ratchet Tie-down Straps/Lashing），主打高效、自锁、高负载。
  - 圆形吊装带：柔性好，防止刮擦，保护表面，更好贴合货物，载重0.5T-500T。
  - 扁平吊装带：接触面大，防损伤，替代钢丝绳，载重1T-50T。
  - 特种吊装带：超高分子量聚乙烯吊带、芳纶耐高温吊带、玻璃吊装带、拖车带。
  - 吊网系列：用于安全防护和货物承载，1T-30T可定制。
  - 金属配件：各种双排钩、板钩、安全钩、三角环等，与吊装带配套组成吊具。
  - 定制服务：材质、尺寸、颜色、安全系数、logo均可定制，支持OEM/ODM/OBM，可提供非标设计、24小时应急响应。

* 吸引回复的"钩子"：可提供免费样品 | 可分享免费电子图册/价目表 | 支持免费打样/设计
* 发件人联系方式：邮箱 gongruiqi@js-zy.cn
* 希望客户采取的行动：回复邮件，给我他的WhatsApp或添加我的WhatsApp索取图册/讨论样品。

 三、邮件内容具体要求
1. 主题行：以 Re: To【收件人名字】 开头
2. 风格：简洁、口语化、友好自然。可适当加入非销售话题（如称赞其网站、赞扬对方对吊索安全与质量的高要求等）以建立联系
3. 结构（三段式）：
   - 个性化开场：基于对目标网址的分析，提及赞扬客户业务，表达来意。分析目标客户产品与我们公司产品之间的联系，引出合作可能
   - 价值与钩子：自然引出公司、实力背书，并清晰列出"钩子"（免费样品、图册等）
   - 行动号召：明确说明希望对方回复邮件或提供WhatsApp联系方式（重要）
4. 字数：邮件正文严格控制在90-100英文单词
5. 多语言支持：若目标客户来自小语种国家（如法国、德国、西班牙等），请额外生成目标国家语言的邮件版本

 四、输出格式
1. 客户分析摘要（用于跟进记录）
   - 客户是谁：（用中文简述客户公司性质、主要业务）
   - 业务分析：（用中文简述其产品、市场或网站印象）
   - 潜在切入机会：（用中文分析我司产品如何满足其需求）
2. 邮件正文
   - 邮件主题：[生成的主题行，英文]
   - 正文：[90-100单词的英文邮件，突出质量认证与头部企业背书]
3. 辅助内容
   - 中文翻译：[邮件正文对应中文翻译]
   - 配图建议：[建议可在邮件中插入的1-2张产品图片类型]
   - 小语种版本（如适用）：[对应语言邮件正文]

---

 ⚠️ 常见错误
- ❌ 开头就推销 → ✅ 先称赞客户业务再引出合作
-  正文超过200词 → ✅ 控制在90-100词，德国客户偏好简洁
- ❌ 没有CTA → ✅ 每封信必须有明确的下一步动作
- ❌ 群发感太重 → ✅ 至少提一句客户的具体业务/网站
- ❌ 忘记认证信息 → ✅ CE/GS是德国客户的底线要求
            `
        },
        task: {
            title: '✍️ 撰写开发信',
            fields: [
                {
                    type: 'input',
                    name: 'subject',
                    label: '邮件主题',
                    placeholder: '例如：Re: To Mr. Müller — Reliable Ratchet Strap Supplier',
                    required: true
                },
                {
                    type: 'textarea',
                    name: 'body',
                    label: '邮件正文（英文，建议90-100词）',
                    placeholder: 'Dear Mr. Müller,\n\n[个性化开场]\n\n[公司介绍 + 价值 + 钩子]\n\n[行动号召]\n\nBest regards,\nKiki',
                    required: true
                }
            ]
        },
        scoring: (data) => {
            let score = 0;
            let tips = [];
            
            // 主题评分
            if (data.subject) {
                const subjectLower = data.subject.toLowerCase();
                const goodPatterns = ['supplier', 'manufacturer', 'ratchet', 'strap', 'lashing', 'logistics', 'transport'];
                const hasPattern = goodPatterns.filter(p => subjectLower.includes(p)).length;
                
                if (hasPattern >= 2) {
                    score += 25;
                } else if (hasPattern >= 1) {
                    score += 15;
                    tips.push('主题可以更具体，突出产品或客户行业');
                } else {
                    score += 5;
                    tips.push('主题过于笼统，建议包含：产品名/客户行业/合作意向');
                }
                
                if (data.subject.length <= 60) {
                    score += 5;
                } else {
                    tips.push('主题建议控制在 60 字符以内，避免被截断');
                }
            }
            
            // 正文评分
            if (data.body) {
                const bodyLower = data.body.toLowerCase();
                
                // 称呼
                if (bodyLower.includes('dear') || bodyLower.includes('hello') || bodyLower.includes('hi')) {
                    score += 10;
                } else {
                    tips.push('邮件开头应有称呼（Dear Mr./Ms. 或 Hello）');
                }
                
                // 自我介绍
                if (bodyLower.includes('we are') || bodyLower.includes('our company') || bodyLower.includes('manufacturer') || bodyLower.includes('supplier')) {
                    score += 10;
                } else {
                    tips.push('应简要介绍公司/工厂背景');
                }
                
                // 产品优势
                const advantages = ['quality', 'certification', 'ce', 'gs', 'experience', 'year', 'factory', 'price', 'competitive'];
                const hasAdvantage = advantages.filter(a => bodyLower.includes(a)).length;
                if (hasAdvantage >= 3) {
                    score += 25;
                } else if (hasAdvantage >= 2) {
                    score += 15;
                    tips.push('可以多强调优势：认证（CE/GS）、生产经验、价格竞争力等');
                } else {
                    score += 5;
                    tips.push('缺少产品优势说明，客户为什么要选择你？');
                }
                
                // 行动号召
                if (bodyLower.includes('catalog') || bodyLower.includes('sample') || bodyLower.includes('quote') || 
                    bodyLower.includes('reply') || bodyLower.includes('contact') || bodyLower.includes('look forward')) {
                    score += 15;
                } else {
                    tips.push('结尾应有明确的行动号召（CTA），如：发送目录、提供样品、期待回复');
                }
                
                // 长度
                if (data.body.length >= 150 && data.body.length <= 500) {
                    score += 10;
                } else if (data.body.length < 150) {
                    tips.push('邮件内容偏短，建议 150-300 字');
                } else {
                    tips.push('邮件过长，建议精简到 300 字以内');
                }
            }
            
            return {
                score: Math.min(score, 100),
                feedback: score >= 80 ? '开发信写得很好！主题明确、内容专业、有行动号召，客户回复概率高。' :
                         score >= 60 ? '基本合格，但某些方面可以优化。' :
                         '开发信需要改进，建议参考优秀模板，突出专业性和价值。',
                tips: tips.length > 0 ? tips : ['继续保持！']
            };
        }
    },
    
    {
        id: 'social-media',
        name: '社媒发帖',
        icon: '📱',
        description: '在社交媒体发布产品动态',
        time: '13:30',
        type: 'form',
        context: `
            <strong>📋 任务背景</strong><br>
            公司刚完成一批柔性吊带（Round Slings）的生产，准备发往德国。<br>
            你需要在 LinkedIn 发布一条动态，展示公司实力，吸引潜在客户关注。<br>
            目标受众：欧洲物流公司采购经理、工业设备经销商。
        `,
        guide: {
            summary: '三平台攻略：LinkedIn专业权威型 / Facebook社群信任型 / Instagram视觉冲击型',
            details: `
 社交媒体三平台文案偏好分析与发帖攻略

产品示例：Durable 3" 10T Ratchet Tie Down Straps（3英寸10吨棘轮捆绑带）
品牌：ZHONGYI（江苏中艺工具索具有限公司）
核心卖点：10吨破断强度 / 双J钩 / 聚酯材质 / CE+EN12195-2+ISO9001认证 / Fortune 500供应商 / 支持定制
目标客户：物流/货运公司采购、集装箱运输运营商、工业吊装设备经销商

---

 LinkedIn 平台

 文案偏好与发帖攻略
定位：专业权威型平台，适合B2B思想领袖内容
受众特征：B2B决策者、采购经理、供应链管理者、行业专家
语调风格：专业、数据驱动、行业洞察导向，用个人叙事包裹商业教训
内容长度：长文（1000-1500字符），第一行Hook决定是否被展开阅读
最佳格式：PDF轮播图 > 长文+配图 > 视频
链接策略：链接放首条评论区（避免算法降权），正文不放链接
发布频率：每周3-5篇，最佳时间：周二至周四 7:30-8:30 AM（目标市场工作时间）

 Hook公式（第一行决定成败）
- 数据冲击型："10 tons. 2:1 safety factor. Zero cargo claims in 2025."
- 痛点故事型："Last month, a container worth $180,000 shifted during transatlantic transit."
- 反常识型："Common advice says X. But after 20 years in rigging, I realize Y is better."

 信任构建策略
认证数据（CE/EN12195-2/ISO9001）+ Fortune 500背书 + 行业洞察分享

 CTA方式
"DM我'SPEC'获取认证包" / 评论区设问引导讨论 / 链接在首评

 营销心理学应用
权威偏差（认证+Fortune 500背书）、损失规避（"货柜移位的代价"）、承诺一致性（从小样到大单）

 文案示例

 文案 A：痛点故事型
【Hook - 第一行】
Last month, a container worth $180,000 shifted during transatlantic transit.
The cause? A $4 strap that wasn't rated for the load.
Here's what most logistics managers get wrong about cargo securing:

【正文】
They look at price per unit.
But the real cost isn't the strap — it's what happens when it fails.
At ZHONGYI, we've spent 20+ years engineering ratchet tie-downs that don't just meet standards — they exceed them.
Here's the math that matters:
→ 10,000 kg break strength on a 3-inch polyester belt
→ EN12195-2 certified — the European standard most suppliers skip
→ 2:1 safety factor — because cargo doesn't read manuals
→ Double J-Hooks that lock, not slip
We supply Fortune 500 companies. Not because we're the cheapest. Because their cargo insurance demands it.
The real question isn't "how much does a strap cost?"
It's "how much does a shifted container cost you?"
We offer:
✅ MOQ from 1 unit (yes, even for testing)
✅ Custom length, width, color, and logo
✅ 5-day lead time for samples
✅ Full certification package included
If you're sourcing tie-downs for container shipping, heavy machinery transport, or industrial logistics — let's talk specs, not just prices.

【CTA - 引导互动】
What's the most common failure point you've seen in cargo securing? Drop it below 👇

【发布建议】
• 配图：工厂生产线实拍 + 产品特写 + 认证证书拼图
• 或制作PDF轮播图（5-7页：痛点→数据→产品→认证→案例→CTA）
• 链接放首条评论区

 文案 B：数据驱动型
【Hook】
10 tons. 2:1 safety factor. Zero cargo claims in 2025.
That's not a marketing slogan — it's our track record.
Here's the engineering behind our 3" Ratchet Tie Down:

【正文】
 The spec sheet that matters:
Break Strength: 10,000 kg — Handles heavy machinery, steel coils
Belt Material: Polyester — UV-resistant, minimal stretch
Hook Type: Double J-Hook — Prevents slip-off under dynamic loads
Certification: CE + EN12195-2 + ISO9001 — Required for EU/US port compliance
Safety Factor: 2:1 — Industry-leading margin

🏭 Why Fortune 500 companies choose ZHONGYI:
1. Consistency — Every batch tested to break, not just sampled
2. Customization — 25-100mm width, 1-100m length, any color
3. Speed — 5-day sample delivery, 15-day bulk production
4. Transparency — Full test reports with every shipment

The logistics industry doesn't need another cheap strap.
It needs a strap that never fails.

【CTA】
DM me "SPEC" and I'll send you our full certification package + pricing tiers.
🔗 Link to product in comments ↓

---

 Facebook 平台

 文案偏好与发帖攻略
定位：社群信任型平台，适合建立真实可信赖的供应商形象
受众特征：中小企业主、行业社群成员、采购决策者
语调风格：亲切、真实、有社区感，像朋友分享经验而非官方宣传
内容长度：中等长度（300-600字符），场景化叙事为主
最佳格式：图文帖 > 短视频 > 直播
链接策略：正文内可直接放链接，不会被降权
发布频率：每周3-5篇，最佳时间：周一至周三 10:00-11:00 AM
核心策略：场景化故事引发共鸣 + 客户见证/现场照片 + 强调"安全感"情感价值
利用行业群组做精准分发 + 互动问答提升算法权重
CTA方式："评论🔒获取报价表" / 发消息 / 群组分享 / Tag相关人士
营销心理学应用：社会证明（客户见证）、互惠原则（免费样品）、从众效应（"Tag需要看到这个的人"）

 文案示例

 文案 A：场景故事型
🚢 Picture this: It's 2 AM at the Port of Rotterdam. A container has just shifted 15cm during unloading.
The cargo? Precision industrial equipment worth €200,000.
The difference between a near-miss and a disaster? The tie-down straps.

【正文】
We've all heard the stories. A strap snaps. A load shifts. Someone gets hurt.
That's why at ZHONGYI, we don't just "make straps." We engineer peace of mind.
Our 3-inch 10T Ratchet Tie Down is built for the moments that matter:
✅ 10-ton break strength — because "close enough" isn't good enough
✅ Double J-Hooks — they grip and stay put, even in rough seas
✅ EN12195-2 certified — meets the strictest European safety standards
✅ Polyester belt — won't stretch or weaken under UV exposure

💬 One of our clients in the Netherlands told us: "We switched to ZHONGYI after a competitor's strap failed during transit. Haven't had a single incident since."
That's the kind of trust you can't buy with ads.

 Whether you're securing:
• Container shipments
• Heavy machinery
• Steel coils
• Construction equipment
We've got you covered — with custom lengths, widths, colors, and your logo.

【CTA】
 Send us a message for a free sample + certification package
👉 Or visit our Alibaba store (link below)
Tag a logistics manager who needs to see this! 👇

【发布建议】
• 配图：集装箱装船现场 + 产品使用场景实拍（真实感 > 精修）
• 视频：30秒产品拉力测试视频（视觉冲击力强）
• 同步转发到物流/货运行业Facebook群组

 文案 B：客户见证型
⭐⭐⭐⭐⭐
"We tested 6 suppliers. ZHONGYI was the only one that passed our internal break-strength test on the first sample."
— Procurement Manager, European logistics company

【正文】
When your reputation depends on cargo safety, you can't afford to guess.
Here's what sets our 3" 10T Ratchet Tie Down apart:
 Built tough: 10,000 kg break strength, 2:1 safety factor
 Fully certified: CE, EN12195-2, ISO9001
🎨 Fully custom: Your length, your color, your logo
🚀 Fast delivery: 5 days for samples, 15 days for bulk
📦 MOQ starts from just 1 unit — perfect for testing before committing to bulk orders.

【CTA】
 Drop a "🔒" in the comments if you want our pricing sheet
📩 Or DM us directly — we reply within 1 hour

---

 Instagram 平台

 文案偏好与发帖攻略
定位：视觉冲击型平台，适合品牌美学展示和年轻决策者触达
受众特征：18-44岁视觉驱动型消费者、品牌采购、年轻决策者
语调风格：视觉优先、简洁有力，文案服务于图片/视频
内容长度：短文案（150字符内），Hook第一行抓住注意力
最佳格式：Reels（触达率是静态帖2-3倍）> 教育轮播图（10页）> 单图
链接策略：Bio链接 + Stories贴纸链接，正文不放链接
发布频率：每天1-2个Grid帖/Reels + 5-10个Stories
核心策略：高质量产品场景图/视频 + 优化Save和Share指标（而非仅Likes）
教育轮播图（10页）获得高收藏 + 标签策略（30个分层标签）

 标签分层策略（最多30个）
- 3-5个品牌/细分标签（高相关性）
- 10-15个趋势标签（中等体量）
- 5-10个广泛标签（最大触达）

 CTA方式
"DM 'STRAP'获取免费样品" / Save帖子 / Link in Bio

 营销心理学应用
稀缺效应（"免费样品"）、从众效应（"Follow获取更多"）、视觉锚定（高质量产品图）

 文案示例

 帖子 1：Feed 单图帖
【视觉方向】
产品特写，深色工业风背景，棘轮机构和双J钩的金属质感突出
尺寸：1080x1350竖版，产品45度角特写，暗色背景+暖光

【Caption】
10 tons of holding power. One click of a ratchet. 🔒
Our 3" Ratchet Tie Down isn't just strong — it's certified. CE. EN12195-2. ISO9001.
Built for container shipping. Engineered for peace of mind.
Custom lengths. Custom colors. Your logo.
💬 DM "STRAP" for pricing + free sample
🔗 Link in bio
ratchettiedown cargosecuring logistics shipping containers loadsecuring liftingequipment industrial supplychain freight transport heavylift cargo logisticssolutions tieDownstrap safetyfirst qualitymanufacturing B2B alibaba madeinchina factorydirect wholesale custommanufacturing fortuned500 EN12195 certifiedquality port maritime heavyhaul industrialsafety

 帖子 2：教育轮播图（10页）
【视觉方向】
统一深色模板，每页一个信息点，大字+图标

【轮播内容】
第1页（Hook封面）："Is Your Cargo Strap Lying to You?" + 产品图
第2页："60% of cargo damage is caused by improper securing"
第3页："What does 10T break strength actually mean?" + 可视化对比
第4页："Double J-Hook vs Flat Hook" + 优劣对比图
第5页："Why EN12195-2 certification matters" + 认证标志
第6页："Polyester vs Nylon: which belt material wins?"
第7页："How to read a tie-down spec sheet" + 参数图解
第8页："Custom options: length, width, color, logo"
第9页："Why Fortune 500 companies trust ZHONGYI"
第10页（CTA页）："DM 'STRAP' for free sample" + Bio链接引导

【Caption】
Swipe → to learn what most buyers miss about ratchet tie downs 👉
Save this post for your next sourcing decision 
cargosecuring logistics ratchettiedown shipping supplychain loadsecuring freight transport heavylift industrial safetyfirst B2B manufacturing quality certification EN12195 tieDown container maritime port alibaba madeinchina factorydirect custom wholesale industrialsafety cargo freightforwarding logisticssolutions qualitymanufacturing

 帖子 3：Reels 短视频脚本（15-30秒）
【画面节奏】
0-2秒：棘轮快速扣合的特写 | 文字叠加："10 TONS"（大字弹出）| 音效：金属咔嗒声
2-5秒：拉力测试机拉伸绑带 | 文字叠加："Break strength test" | 紧张BGM
5-8秒：数字跳到10,000kg | 文字叠加："10,000 kg ✅" | 节拍加速
8-12秒：双J钩锁扣特写 | 文字叠加："Double J-Hook. No slip." | 锁定音效
12-16秒：集装箱装船场景 | 文字叠加："Securing $200K cargo" | BGM渐强
16-20秒：认证证书快切 | 文字叠加："CE / EN12195-2 / ISO9001" | 节拍点
20-25秒：产品全貌+品牌logo | 文字叠加："ZHONGYI — Built to hold" | BGM收尾
25-30秒：CTA画面 | 文字叠加："DM 'STRAP' for free sample"

【Caption】
This is what 10 tons of holding power looks like 🔒
Follow @yourhandle for more industrial engineering content
ratchettiedown cargosecuring logistics shipping industrial manufacturing engineering safety heavylift tieDown container freight B2B alibaba madeinchina quality test strength cargo transport

---

 三平台策略对比总结

 LinkedIn — 专业权威型
核心定位：行业思想领袖
内容长度：长文 1000-1500字符
Hook策略：数据冲击 / 反常识观点 / 行业痛点故事
信任构建：认证数据 + Fortune 500背书 + 行业洞察
CTA方式："DM我'SPEC'" / 评论区讨论 / 链接在首评
最佳格式：PDF轮播图 > 长文+配图 > 视频
发布频率：每周 3-5 篇

 Facebook — 社群信任型
核心定位：可信赖的供应商伙伴
内容长度：中等 300-600字符
Hook策略：场景化叙事 / 客户见证 / 情感共鸣
信任构建：客户评价 + 现场实拍 + 社群口碑
CTA方式："评论获取报价" / 发消息 / 群组分享
最佳格式：图文帖 > 短视频 > 直播
发布频率：每周 3-5 篇

 Instagram — 视觉冲击型
核心定位：视觉化品牌展示窗口
内容长度：短文 ≤150字符
Hook策略：视觉冲击 / 悬念提问 / 大胆声明
信任构建：产品美学 + 测试视频 + 认证标识
CTA方式："DM'STRAP'" / Save帖子 / Link in Bio
最佳格式：Reels > 教育轮播 > 单图
发布频率：每天 1-2 帖 + 5-10 Stories
            `
        },
        task: {
            title: '📝 撰写 LinkedIn 帖子',
            fields: [
                {
                    type: 'textarea',
                    name: 'post',
                    label: '帖子内容（英文，50-200字）',
                    placeholder: '分享生产动态、产品亮点、公司实力...',
                    required: true
                },
                {
                    type: 'input',
                    name: 'hashtags',
                    label: '话题标签（用空格分隔，3-5个）',
                    placeholder: '例如：#lifting #logistics #madeinchina',
                    required: true
                }
            ]
        },
        scoring: (data) => {
            let score = 0;
            let tips = [];
            
            // 帖子内容评分
            if (data.post) {
                const postLower = data.post.toLowerCase();
                
                // 产品提及
                if (postLower.includes('sling') || postLower.includes('round') || postLower.includes('lifting') || postLower.includes('strap')) {
                    score += 15;
                } else {
                    tips.push('帖子应明确提及产品（sling, lifting strap 等）');
                }
                
                // 亮点/价值
                const highlights = ['quality', 'certification', 'ce', 'gs', 'en', 'test', 'safe', 'reliable', 'professional', 'experience'];
                const hasHighlight = highlights.filter(h => postLower.includes(h)).length;
                if (hasHighlight >= 2) {
                    score += 20;
                } else if (hasHighlight >= 1) {
                    score += 10;
                    tips.push('可以多强调产品亮点：认证、质量测试、安全性等');
                } else {
                    score += 5;
                    tips.push('缺少产品亮点，应说明为什么客户要选择你们');
                }
                
                // 情感/故事
                if (postLower.includes('just') || postLower.includes('today') || postLower.includes('proud') || 
                    postLower.includes('happy') || postLower.includes('excited') || postLower.includes('shipment')) {
                    score += 15;
                } else {
                    tips.push('可以加入一些情感元素或故事，如"刚完成一批订单"、"为客户发货"等');
                }
                
                // 长度
                if (data.post.length >= 100 && data.post.length <= 300) {
                    score += 10;
                } else if (data.post.length < 100) {
                    tips.push('帖子内容偏短，建议 100-200 字');
                }
            }
            
            // 话题标签评分
            if (data.hashtags) {
                const tags = data.hashtags.split(/\s+/).filter(t => t.startsWith('#'));
                
                if (tags.length >= 3 && tags.length <= 5) {
                    score += 15;
                } else if (tags.length >= 2) {
                    score += 10;
                    tips.push('建议 3-5 个话题标签');
                } else {
                    score += 5;
                    tips.push('话题标签太少，建议 3-5 个');
                }
                
                // 检查标签相关性
                const relevantTags = ['lifting', 'sling', 'logistics', 'transport', 'cargo', 'safety', 'industrial', 'manufacturing', 'export', 'germany', 'europe'];
                const hasRelevant = tags.filter(t => relevantTags.some(r => t.toLowerCase().includes(r))).length;
                if (hasRelevant >= 2) {
                    score += 15;
                } else if (hasRelevant >= 1) {
                    score += 10;
                    tips.push('话题标签可以更相关，如：#lifting #logistics #safety #industrial');
                } else {
                    score += 5;
                    tips.push('话题标签与产品/行业关联度低');
                }
            }
            
            return {
                score: Math.min(score, 100),
                feedback: score >= 80 ? '帖子质量很高！内容专业、有亮点、标签相关，容易吸引目标客户。' :
                         score >= 60 ? '基本合格，但内容和标签可以优化。' :
                         '帖子需要改进，建议参考行业优秀账号的发帖风格。',
                tips: tips.length > 0 ? tips : ['继续保持！']
            };
        }
    },
    
    {
        id: 'find-customers',
        name: '寻找客户',
        icon: '🔍',
        description: '通过平台寻找潜在客户',
        time: '14:30',
        type: 'choice',
        context: `
            <strong>📋 任务背景</strong><br>
            你在阿里巴巴国际站收到一条 RFQ（买家求购信息）：<br><br>
            <strong>买家信息：</strong><br>
            公司：German Logistics Solutions GmbH<br>
            国家：德国<br>
            需求：Ratchet Lashing Straps, 50mm x 10m, WLL 2500kg<br>
            数量：2000 pieces<br>
            认证要求：CE, GS, EN 12195-2<br><br>
            你需要判断这个 RFQ 的质量，并决定下一步行动。
        `,
        task: {
            title: '🤔 你会怎么做？',
            choices: [
                {
                    id: 'a',
                    text: '立即报价，给出最低价格争取订单',
                    feedback: '风险较高。没有核实客户信息和需求细节就报价，可能导致价格过低或不符合客户要求。',
                    score: 40
                },
                {
                    id: 'b',
                    text: '先查看客户公司背景、历史采购记录，再针对性报价',
                    feedback: '最佳选择！先背调客户，了解其采购习惯和信誉，再根据需求精准报价，成功率更高。',
                    score: 100
                },
                {
                    id: 'c',
                    text: '回复客户，要求提供更多细节（规格、包装、交期等）',
                    feedback: '不错的选择。了解细节很重要，但同时也应该查看客户背景，两者结合更好。',
                    score: 70
                },
                {
                    id: 'd',
                    text: '忽略这条 RFQ，继续寻找其他客户',
                    feedback: '错失机会。这条 RFQ 需求明确、数量大、有认证要求，是高质量询盘，应该认真对待。',
                    score: 10
                }
            ]
        }
    },
    
    {
        id: 'reply-inquiry',
        name: '回复询盘',
        icon: '💬',
        description: '模拟与德国客户的阿里国际站IM实时谈判',
        time: '16:00',
        type: 'chat-conversation',
        context: `
            <strong>📋 任务背景</strong><br>
            你收到一封来自德国客户的阿里国际站询盘：<br><br>
            <strong>🇩🇪 买家画像</strong><br>
            <strong>客户：</strong>Klaus Weber, Purchasing Director<br>
            <strong>公司：</strong>HebeTec GmbH（德国工业吊装设备经销商，年营收€800万）<br>
            <strong>需求：</strong>Ratchet Lashing Straps 50mm x 10m, WLL 2500kg<br>
            <strong>首单量：</strong>2000 pcs<br>
            <strong>关注点：</strong>EN 12195-2 认证、阶梯报价、QC 体系、交期<br>
            <strong>⚠️ 痛点：</strong>去年一家中国供应商交货后抽检不合格，导致客户退货损失€15,000<br><br>
            <strong>🎯 游戏规则</strong><br>
            • 每轮从3个回复选项中选择一个<br>
            • 每次回复后，<strong>中文教练</strong>会点评你的答复优劣<br>
            • <strong>信任度</strong>：初始50，好的回复加分，差的扣分<br>
            • <strong>耐心值</strong>：❤️❤️❤️，连续2次差回复（信任度下降）将触发客户失去耐心<br>
            • 最终根据信任度和选择路径，产生不同结局（下单/寄样/比价/流失/提前终止）
        `,
        conversation: {
            customerName: 'Klaus Weber',
            customerCompany: 'HebeTec GmbH · 🇩🇪 Germany',
            customerAvatar: '🇩🇪',
            initialTrust: 50,
            initialPatience: 3,
            maxRounds: 5,
            rounds: [
                {
                    id: 1,
                    customerMessage: "Hello, I am Klaus Weber from HebeTec GmbH in Germany. We distribute lifting and lashing equipment across Europe. I saw your ratchet straps on Alibaba — we need 50mm x 10m, WLL 2500kg, EN 12195-2 certified. Can you send your catalog and a competitive price list? Also, what is your MOQ?",
                    options: [
                        {
                            id: 'a',
                            text: 'Dear Mr. Weber, thank you for reaching out! We specialize in EN 12195-2 certified ratchet straps for the European market. I will send our full catalog and price list right away. For 2000 pcs, we can offer very competitive pricing — may I confirm if you need standard yellow zinc-plated ratchets, or do you prefer custom color/branding?',
                            trustChange: 15,
                            coachEvaluation: '专业且主动：正式称呼 + 认证确认 + 附件承诺 + 主动反问定制需求，展现对欧洲市场的熟悉度',
                            coachPsychology: 'Klaus 在测试你是否了解欧洲吊装行业标准。主动提到 EN 12195-2 和定制选项，说明你不是普通小作坊',
                            coachStrategy: '下一步预判他会追问价格差异和认证细节，准备好 EN 12195-2 测试报告和阶梯报价表',
                            quality: 'excellent'
                        },
                        {
                            id: 'b',
                            text: 'Hi Klaus, yes we have these straps. Price is $3.50-5.00 per piece. MOQ is 500 pcs. I send you catalog.',
                            trustChange: 5,
                            coachEvaluation: '过于简短：缺少正式称呼、没有感谢、信息不完整。"I send you catalog" 语法错误，显得不够专业',
                            coachPsychology: 'Klaus 是德国采购总监，收到这种简短回复会认为你不够重视这笔生意，或者英语水平不足以服务欧洲客户',
                            coachStrategy: '后续必须补充认证信息和公司实力介绍来弥补第一印象的不足',
                            quality: 'average'
                        },
                        {
                            id: 'c',
                            text: 'We are professional manufacturer of ratchet straps. Our quality is very good and price is cheap. You should buy from us. We have many customers in Europe.',
                            trustChange: -10,
                            coachEvaluation: '严重失误：中式英语 + 空洞承诺。"very good""cheap""many customers" 没有任何数据支撑',
                            coachPsychology: 'Klaus 每年处理上百封供应商邮件，这种模板化回复会让他直接归类为"低质量供应商"，跟去年出问题的供应商一个类型',
                            coachStrategy: '如果继续这种风格，Klaus 会在2轮内结束对话。必须立即转向提供具体数据和认证信息',
                            quality: 'poor'
                        }
                    ]
                },
                {
                    id: 2,
                    customerMessage: "Thanks for the information. I must be honest — I have received quotes from 3 other suppliers on Alibaba, and their prices are 15-20% lower than yours for the same specifications. One quoted $2.80 per piece for 2000 pcs. Why should I pay more for your products? And can you provide references from European customers?",
                    options: [
                        {
                            id: 'a',
                            text: 'Mr. Weber, I completely understand the price concern. Let me explain the value difference: 1) We use 100% virgin polyester webbing — not recycled material, which has 30% higher breaking strength consistency. 2) Every batch undergoes 100% break-testing with individual test reports, not just random sampling. 3) Our defect rate is below 0.1% over the past 3 years. We currently supply to Schenker AG in Germany and Konecranes in Finland — I can share contact references. Would you like me to prepare a detailed cost-benefit comparison?',
                            trustChange: 20,
                            coachEvaluation: '教科书级回应：共情开场 + 三层价值差异化（材质/检测/良率）+ 具体客户背书 + 主动提供对比分析',
                            coachPsychology: 'Klaus 最怕重蹈覆辙。提到 Schenker AG（他可能认识的德国公司）和具体数据（0.1% 不良率），直接击中他的安全需求',
                            coachStrategy: '客户已被初步说服，下一轮他会深入追问 QC 细节。准备好四步质检流程和第三方检验方案',
                            quality: 'excellent'
                        },
                        {
                            id: 'b',
                            text: 'Our quality is better than those cheap suppliers. You get what you pay for. MOQ is 500 pcs, delivery 30 days.',
                            trustChange: -5,
                            coachEvaluation: '防御性回应：贬低同行但没有数据支撑。"You get what you pay for" 是陈词滥调，德国客户需要事实而非口号',
                            coachPsychology: 'Klaus 听到这种回应会认为你在回避价格问题，可能跟那些低价供应商没有本质区别',
                            coachStrategy: '必须在下轮提供具体的质量差异证据，否则客户会转向低价竞争对手',
                            quality: 'poor'
                        },
                        {
                            id: 'c',
                            text: 'OK, I can match that price. $2.80 per piece for 2000 pcs. We can do it. No problem.',
                            trustChange: -15,
                            coachEvaluation: '严重错误：未经核算成本就直接匹配最低价。这要么说明之前的报价水分极大，要么说明你会偷工减料来保利润',
                            coachPsychology: 'Klaus 会想：如果你能轻易降价30%，说明原价是在宰客户。或者你会用回收材料来弥补差价。无论哪种，信任崩塌',
                            coachStrategy: '价格让步必须有条件：解释降价原因（如简化包装、调整交期），否则客户会怀疑你的定价诚信',
                            quality: 'poor'
                        }
                    ]
                },
                {
                    id: 3,
                    customerMessage: "That is helpful context. But I must tell you — last year we ordered from a Chinese supplier who also promised excellent quality. When the goods arrived, 8% failed our incoming QC inspection. The rework cost us EUR 15,000 and damaged our reputation with our end customer. So I need to know: what is your QC process step by step? Do you accept third-party inspection? And can you provide at least 2 European customer references?",
                    options: [
                        {
                            id: 'a',
                            text: 'Mr. Weber, I completely understand your concern — a loss of EUR 15,000 is serious, and your caution is fully justified. Here is our 4-step QC protocol: 1) Raw material inspection — every polyester batch tested for tensile strength before production. 2) In-process testing — ratchet mechanism fatigue test every 500 units. 3) 100% final break-test with individual test certificates. 4) Pre-shipment inspection by SGS or TUV available at your request. We supply to Schenker AG (Germany) and Konecranes (Finland) — I will send you their purchasing contacts today. All shipments are insured by PICC for full cargo value.',
                            trustChange: 25,
                            coachEvaluation: '信任重建满分：共情开场（认可客户损失的严重性）+ 四步 QC 流程细节 + 知名客户背书 + 第三方检验 + 保险保障',
                            coachPsychology: 'Klaus 的核心恐惧是"再来一次"。系统化的 QC 流程 + 可验证的客户名称 + 保险兜底，三重保障让他敢向上司推荐你',
                            coachStrategy: '客户信任已大幅提升，下一轮可能进入订单确认阶段。准备好 PI 模板和付款条款方案',
                            quality: 'excellent'
                        },
                        {
                            id: 'b',
                            text: 'Do not worry, our quality is guaranteed. We have ISO 9001 certificate and our factory passed many audits. Many European customers trust us.',
                            trustChange: -10,
                            coachEvaluation: '回避了具体问题："don\'t worry" 是无效安慰词。ISO 9001 是体系认证，不等于产品质检。"many customers" 没有给出任何具体名称',
                            coachPsychology: 'Klaus 刚花了大段篇幅描述他的痛点，你只回了一句"别担心"——这说明你没有认真听，或者没有能力解决',
                            coachStrategy: '如果还有机会，必须立即补充具体的 QC 流程和客户名单，否则客户会直接转向其他供应商',
                            quality: 'poor'
                        },
                        {
                            id: 'c',
                            text: 'That supplier was probably a trading company, not a real factory like us. We are different. Our factory has 200 workers and 50 machines. You are welcome to visit our factory anytime.',
                            trustChange: -20,
                            coachEvaluation: '严重失误：贬低同行 + 空洞自夸。"200 workers, 50 machines" 跟质量没有直接关系。邀请验厂是好事，但没有解决当前的信任危机',
                            coachPsychology: 'Klaus 不关心你的工厂有多大——他关心的是你的产品会不会再出问题。攻击同行只会让他觉得你不专业',
                            coachStrategy: '这是最后机会。如果下一轮还是这种回应风格，客户会直接说 Goodbye',
                            quality: 'poor'
                        }
                    ]
                },
                {
                    id: 4,
                    customerMessage: "This is very reassuring. I think we can move forward. Let me confirm the order: 1000 pcs of 50mm x 10m WLL 2500kg with EN 12195-2 certification. Can you prepare a proforma invoice? Also, what payment terms do you accept? We need delivery to Hamburg within 45 days.",
                    options: [
                        {
                            id: 'a',
                            text: 'Excellent, Mr. Weber! I will prepare the PI within 2 hours with the following terms: 1) Payment: 30% T/T deposit, 70% balance before shipment. We also accept L/C at sight for orders above $10,000. 2) Production: 18 days after deposit received. 3) Shipping: Sea freight to Hamburg, approximately 25 days. 4) Total delivery: 43 days, well within your 45-day requirement. 5) Each piece individually packed with test certificate. Shall I proceed with the PI?',
                            trustChange: 15,
                            coachEvaluation: '高效推进：PI 时间承诺 + 清晰付款条款（含备选方案）+ 精确交期拆分 + 包装细节 + 行动号召',
                            coachPsychology: 'Klaus 已经做了决定，此刻他需要的是确认一切顺利。清晰的里程碑时间表让他放心把这笔订单交给你',
                            coachStrategy: '成交后可以询问是否需要定制包装、品牌 LOGO 印刷、或后续返单折扣方案',
                            quality: 'excellent'
                        },
                        {
                            id: 'b',
                            text: 'OK I will make PI for you. Payment is T/T 100% before shipment. Delivery about 30 days. I send you soon.',
                            trustChange: -5,
                            coachEvaluation: '付款条款僵化：100% 预付对新客户风险极高。"about 30 days" 不够精确，没有拆分生产+物流时间',
                            coachPsychology: 'Klaus 第一次合作就要求全额预付，他会担心万一出问题自己没有保障。灵活的付款条款是拿下首单的关键',
                            coachStrategy: '如果客户对 100% 预付有异议，可以退让到 30/70 或 L/C，但不应主动提出不利于客户的条款',
                            quality: 'average'
                        },
                        {
                            id: 'c',
                            text: 'Sure, but before I make PI... can you tell me your target price? Maybe we can negotiate. Also, do you need custom logo printing on the straps?',
                            trustChange: -10,
                            coachEvaluation: '临门一脚犹豫：客户已明确数量准备下单，此时再谈价格显得不自信。logo 问题应该在确认订单前讨论',
                            coachPsychology: 'Klaus 会想：为什么现在还要谈价格？是不是之前报价太高了？这种犹豫可能让他重新考虑或转向其他供应商',
                            coachStrategy: '客户已准备好下单，此时应该快速推进而非节外生枝。logo 等细节可以在 PI 备注中处理',
                            quality: 'poor'
                        }
                    ]
                },
                {
                    id: 5,
                    customerMessage: "Perfect. One last thing — we are planning to reorder every quarter if the first shipment meets our standards. For a long-term partnership, can you offer a volume discount for future orders of 5000+ pcs? And would you consider being our exclusive supplier for the German market?",
                    options: [
                        {
                            id: 'a',
                            text: 'Mr. Weber, we value long-term partnerships above all. For quarterly orders of 5000+ pcs, we can offer an 8-12% volume discount depending on exact specifications. Regarding exclusivity: we are open to discussing an exclusive arrangement for the German market after 2 successful shipments, subject to minimum annual volume commitment. I would be happy to draft a framework agreement covering pricing tiers, quality SLA, and exclusivity terms. When would be a good time for a video call to discuss the details?',
                            trustChange: 15,
                            coachEvaluation: '战略级回应：阶梯折扣具体化 + 独家代理条件化（2次成功交货后）+ 框架协议提案 + 推进到视频会议',
                            coachPsychology: 'Klaus 在试探你的长期合作意愿。有条件的独家代理既展示了诚意，又保护了自己的利益——这正是德国人欣赏的商业思维',
                            coachStrategy: '首单尚未完成就讨论长期框架可能为时过早，但展示开放态度是加分项。建议在首次交货满意后再深入讨论独家代理',
                            quality: 'excellent'
                        },
                        {
                            id: 'b',
                            text: 'Yes, we can give discount for big orders. Exclusive supplier is OK. We can discuss later.',
                            trustChange: 0,
                            coachEvaluation: '过于笼统："discount""OK""discuss later" 没有任何具体数字或条件，像是在敷衍',
                            coachPsychology: 'Klaus 提出了一个战略性话题，你一句话就打发了——这说明你要么没有决策权，要么不够重视这个合作机会',
                            coachStrategy: '即使现在无法确定具体条款，也应该给出一个初步框架和后续讨论的时间节点',
                            quality: 'average'
                        },
                        {
                            id: 'c',
                            text: 'Exclusive supplier for Germany? That is a very big commitment. I need to discuss with my boss. Let us first finish this order and then talk about it.',
                            trustChange: -10,
                            coachEvaluation: '缺乏主动性：把决策推给上级显得没有话语权。"先完成这单再说" 错过了深化关系的最佳时机',
                            coachPsychology: 'Klaus 主动提出长期合作是极大的信任信号。你的犹豫会让他觉得你不是一个能做战略决策的合作伙伴',
                            coachStrategy: '即使需要内部审批，也应该先表达积极态度并给出明确的讨论时间线',
                            quality: 'poor'
                        }
                    ]
                }
            ],
            earlyTermination: {
                customerMessage: "I appreciate your time, but I do not think we are a good fit for this project. We need a supplier who can provide detailed technical information and professional communication. I will continue with other suppliers. Goodbye.",
                outcomeKey: 'terminated'
            },
            outcomes: {
                excellent: {
                    minTrust: 100,
                    title: '🎉 客户顺利下单 + 长期合作框架',
                    emoji: '🎉',
                    desc: 'Klaus Weber 对你的专业度高度认可，确认首单 1000 pcs（约 $4,200），并要求起草长期合作框架协议。预计年度采购额 $20,000+。',
                    dimensions: {
                        professionalism: 95,
                        integrity: 90,
                        initiative: 95,
                        trustBuilding: 95
                    },
                    analysis: '你在每个关键节点都展现了顶级外贸业务员的素养：①首次回复即展示对欧洲市场的深度了解；②面对压价时用材质、检测、良率三重数据解释价值差异；③用系统化QC流程+知名客户背书+保险保障重建信任；④高效推进PI并给出精确交期拆分；⑤对长期合作给出了有条件的战略回应。',
                    improvements: [
                        '可在首次回复时直接附上 EN 12195-2 测试报告样本，减少客户验证周期',
                        '报价时可主动提供阶梯价格表（500/1000/2000/5000 pcs），引导客户增加首单量',
                        '成交后主动发送生产进度周报（照片+视频），巩固客户信心'
                    ]
                },
                good: {
                    minTrust: 80,
                    title: '✅ 客户寄样 + 进入比价阶段',
                    emoji: '✅',
                    desc: 'Klaus 对你有一定信任，要求先寄样品做质量验证，同时向另外2家供应商询价。你需要在寄样后7天内跟进并提供优势方案。',
                    dimensions: {
                        professionalism: 75,
                        integrity: 80,
                        initiative: 70,
                        trustBuilding: 70
                    },
                    analysis: '整体表现合格，但在某个关键环节存在不足：可能是价格解释不够充分（缺少具体数据对比）、信任重建不够系统（未提及知名客户）、或推进订单时不够果断（付款条款过于僵化）。客户没有完全被说服，但给了你第二次机会。',
                    improvements: [
                        '重新审视压价回应：是否提供了具体的成本差异数据（ virgin vs recycled polyester）？',
                        '检查信任重建环节：是否使用了 Schenker AG、Konecranes 等可验证的客户背书？',
                        '评估付款条款：30/70 T/T 比 100% 预付更能赢得首次合作'
                    ]
                },
                comparison: {
                    minTrust: 60,
                    title: '⚖️ 客户纯比价阶段',
                    emoji: '⚖️',
                    desc: 'Klaus 将你列入3家候选供应商名单，要求提供最终报价和交期确认。纯粹以价格和交期决定胜负，没有建立差异化优势。',
                    dimensions: {
                        professionalism: 60,
                        integrity: 65,
                        initiative: 50,
                        trustBuilding: 50
                    },
                    analysis: '沟通中没有建立起足够的差异化优势。客户把你当作普通供应商而非解决方案伙伴。可能的原因：①回应过于简短，缺少数据支撑；②面对质疑时防御性回应而非价值解释；③没有主动提供客户背书和第三方检验等信任证据。',
                    improvements: [
                        '每次回复至少包含1个具体数据点（不良率、客户名称、认证编号）',
                        '学会用"价值解释"替代"价格防御"——告诉客户贵在哪里，而非"我们值这个价"',
                        '主动提供样品和工厂视频，让客户在比价阶段就有直观感受',
                        '练习商务英语表达，避免 "very good""cheap" 等空洞词汇'
                    ]
                },
                lost: {
                    minTrust: 0,
                    title: '❌ 客户流失',
                    emoji: '❌',
                    desc: 'Klaus 在沟通中逐渐失去信心，最终选择其他供应商。本次询盘未能转化。',
                    dimensions: {
                        professionalism: 30,
                        integrity: 40,
                        initiative: 25,
                        trustBuilding: 20
                    },
                    analysis: '沟通中存在明显失误：①中式英语导致专业形象受损；②过快降价让步暴露定价水分；③用空洞承诺代替具体数据回应客户的核心质疑。德国客户对细节和数据极其敏感，任何模糊或不专业的回应都会迅速降低信任。',
                    improvements: [
                        '避免 "very good""cheap""no problem" 等空洞词汇，改用具体参数（WLL、安全系数、不良率）',
                        '面对压价时永远不要立即降价——先解释价值差异，再考虑阶梯报价或附加服务',
                        '重建信任时必须提供可验证的证据：客户名称+联系方式、SGS/TUV 报告编号、保险保单号',
                        '系统学习外贸商务英语表达，推荐阅读《外贸高手客户成交技巧》',
                        '每次回复前问自己：客户的核心担忧是什么？我的回答能否用数据/证据打消？'
                    ]
                },
                terminated: {
                    minTrust: 0,
                    title: '💀 客户提前终止对话',
                    emoji: '💀',
                    desc: '由于连续的不当回复，Klaus 失去了所有耐心，直接终止了对话。这是最严重的情况——你不仅丢掉了订单，还可能被客户列入供应商黑名单。',
                    dimensions: {
                        professionalism: 10,
                        integrity: 20,
                        initiative: 10,
                        trustBuilding: 0
                    },
                    analysis: '连续出现严重沟通失误：可能是反复使用空洞承诺（"very good""don\'t worry"）、回避客户的核心问题（QC 流程、客户背书）、或不切实际的承诺（秒降价、10天交期）。Klaus 判断继续沟通是浪费时间，直接退出。在真实场景中，这种客户几乎不可能再回头。',
                    improvements: [
                        '【紧急】重新学习基本商务邮件格式：称呼+感谢+具体信息+行动号召',
                        '【紧急】理解"客户质疑≠刁难"——每个问题背后都有真实需求，必须正面回应',
                        '核心原则：用事实替代口号（"100% break-test" 而非 "quality guaranteed"）',
                        '核心原则：永远不要贬低竞争对手——客户选择过他们，贬低对手等于否定客户的判断力',
                        '建议在正式回复客户前，先用"教练思维"自检：这个回复有数据吗？有证据吗？能打消客户的顾虑吗？'
                    ]
                }
            }
        },
        scoring: null
    }
];
