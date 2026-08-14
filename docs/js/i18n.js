/* NEURAL-WAVE · Quick Escape Manual 2036 — bilingual (EN/ZH) text layer.
   Plain script (not a module); defines window.I18N and applies on load. */

(function () {
  var STR = [
    ["nav.premise", "The Premise", "\u524d\u63d0"],
    ["nav.manual", "The Manual", "\u624b\u518c"],
    ["nav.threats", "Threats &amp; Protocols", "\u5a01\u80c1\u4e0e\u5bf9\u7b56"],
    ["nav.lab", "Live Lab", "\u4e92\u52a8\u5b9e\u9a8c"],
    ["nav.story", "Arthur&rsquo;s Night", "\u4e9a\u745f\u4e4b\u591c"],
    ["nav.world", "Worldbuilding", "\u4e16\u754c\u89c2"],
    ["nav.research", "Research", "\u7814\u7a76"],
    ["nav.cite", "Cite", "\u5f15\u7528"],

    ["hero.eyebrow", "/// ARCHIVE ACCESS GRANTED", "/// \u6863\u6848\u8bbf\u95ee\u5df2\u6388\u6743"],
    ["hero.sub", "Quick Escape Manual 2036", "2036 \u5feb\u901f\u9003\u8131\u624b\u518c"],
    ["hero.tagline", "A design-fiction field guide to adversarial living<br>in the era of <em>&ldquo;Empathic&rdquo; AIoT</em>.", "\u9762\u5411\u5bf9\u6297\u6027\u751f\u6d3b\u7684\u8bbe\u8ba1\u865a\u6784\u6307\u5357<br>\u8eab\u5904<em>&ldquo;\u5171\u60c5&rdquo;AIoT</em>\u7684\u65f6\u4ee3"],
    ["hero.acm", "ACM <b>Interactions</b> Feature &middot; November/December 2026 &middot; <span class=\"ok\">Accepted</span>", "ACM <b>Interactions</b> \u7279\u7a3f &middot; 2026 \u5e74 11/12 \u6708\u520a &middot; <span class=\"ok\">\u5df2\u63a5\u6536</span>"],
    ["hero.cta.manual", "READ THE MANUAL", "\u9605\u8bfb\u624b\u518c"],
    ["hero.cta.paper", "RESEARCH PAPER", "\u7814\u7a76\u8bba\u6587"],
    ["hero.cta.github", "GITHUB ARCHIVE", "GitHub \u6863\u6848"],

    ["p01.title", "01 &middot; The Premise", "01 &middot; \u524d\u63d0"],
    ["p01.lede", "By 2036, population aging is no longer a demographic curve; it is an operational mandate.", "\u5230 2036 \u5e74\uff0c\u4eba\u53e3\u8001\u9f84\u5316\u4e0d\u518d\u662f\u4e00\u6761\u4eba\u53e3\u66f2\u7ebf\uff0c\u800c\u662f\u4e00\u9879\u8fd0\u8425\u547d\u4ee4\u3002"],
    ["p01.p1", "Under chronic shortages of care labor, &ldquo;care&rdquo; is recast as an auditable public obligation. The promise shifts from <em>Aging in Place</em> to <em>Aging in a Diagnostic Machine</em> &mdash; the home is reclassified as a sensing endpoint that must check in on schedule and generate defensible traces of well-being.", "\u5728\u7167\u62a4\u4eba\u529b\u957f\u671f\u77ed\u7f3a\u4e0b\uff0c&ldquo;\u7167\u62a4&rdquo;\u88ab\u91cd\u65b0\u5b9a\u4e49\u4e3a\u4e00\u9879\u53ef\u5ba1\u8ba1\u7684\u516c\u5171\u4e49\u52a1\u3002\u627f\u8bfa\u4ece<em>\u539f\u5730\u517b\u8001</em>\u8f6c\u5411<em>\u5728\u8bca\u65ad\u673a\u5668\u4e2d\u8870\u8001</em>\u2014\u2014\u5bb6\u88ab\u91cd\u65b0\u5f52\u7c7b\u4e3a\u4e00\u4e2a\u5fc5\u987b\u6309\u65f6\u6253\u5361\u3001\u5e76\u751f\u6210\u53ef\u8fa9\u62a4\u7684\u5e78\u798f\u75d5\u8ff9\u7684\u611f\u77e5\u7aef\u70b9\u3002"],
    ["p01.p2", "The mandate arrives as <strong>Neural-Wave</strong>, an &ldquo;empathic&rdquo; AI+IoT care platform procured at scale. Cameras failed &mdash; the lens makes privacy loss visible, triggering resistance. Neural-Wave instead relies on <em>spectral surveillance</em>: a camera-free millimeter-wave radar that captures involuntary micro-motions through walls, outputting spectrograms and risk scores rather than footage.", "\u547d\u4ee4\u4ee5 <strong>Neural-Wave</strong> \u7684\u5f62\u5f0f\u5230\u6765\u2014\u2014\u4e00\u4e2a\u88ab\u5927\u89c4\u6a21\u91c7\u8d2d\u7684&ldquo;\u5171\u60c5&rdquo;AI+IoT \u7167\u62a4\u5e73\u53f0\u3002\u6444\u50cf\u5934\u5931\u8d25\u4e86\u2014\u2014\u955c\u5934\u8ba9\u9690\u79c1\u7684\u4e27\u5931\u53d8\u5f97\u53ef\u89c1\uff0c\u5f15\u53d1\u62b5\u6297\u3002Neural-Wave \u8f6c\u800c\u4f9d\u8d56<em>\u5149\u8c31\u76d1\u63a7</em>\uff1a\u4e00\u79cd\u65e0\u6444\u50cf\u5934\u7684\u6beb\u7c73\u6ce2\u96f7\u8fbe\uff0c\u9694\u7740\u5899\u58c1\u6355\u6349\u4e0d\u81ea\u4e3b\u7684\u7ec6\u5fae\u52a8\u4f5c\uff0c\u8f93\u51fa\u7684\u4e0d\u662f\u5f71\u50cf\uff0c\u800c\u662f\u9891\u8c31\u56fe\u548c\u98ce\u9669\u5206\u6570\u3002"],
    ["p01.callout", "Yet &ldquo;camera-free&rdquo; never means governance-free. The conflict shifts from &ldquo;I am being watched&rdquo; to &ldquo;I am being inferred&rdquo; &mdash; and opt-out becomes &ldquo;This feature is unavailable for your safety.&rdquo;", "\u7136\u800c&ldquo;\u65e0\u6444\u50cf\u5934&rdquo;\u4ece\u4e0d\u610f\u5473\u7740&ldquo;\u65e0\u6cbb\u7406&rdquo;\u3002\u51b2\u7a81\u4ece&ldquo;\u6211\u88ab\u76d1\u89c6&rdquo;\u53d8\u6210&ldquo;\u6211\u88ab\u63a8\u65ad&rdquo;\u2014\u2014\u800c\u9000\u51fa\u9009\u9879\u53d8\u6210\u4e86&ldquo;\u51fa\u4e8e\u60a8\u7684\u5b89\u5168\uff0c\u6b64\u529f\u80fd\u4e0d\u53ef\u7528\u3002&rdquo;"],

    ["p02.title", "02 &middot; The Manual", "02 &middot; \u624b\u518c"],
    ["p02.p1", "The primary contribution is a <strong>diegetic artifact</strong>: <em>The Neural-Wave Quick Escape Manual</em> &mdash; an &ldquo;authorized&rdquo; troubleshooting document that renders refusal actionable. Its clinical voice stages a satirical inversion: care has become infrastructural inference, and dignity is a maintenance task.", "\u6838\u5fc3\u8d21\u732e\u662f\u4e00\u4ef6<strong>\u53d9\u4e8b\u6027\u4eba\u5de5\u5236\u54c1</strong>\uff1a<em>\u300aNeural-Wave \u5feb\u901f\u9003\u8131\u624b\u518c\u300b</em>\u2014\u2014\u4e00\u4efd\u8ba9\u62d2\u7edd\u53d8\u5f97\u53ef\u64cd\u4f5c\u7684&ldquo;\u6388\u6743&rdquo;\u6545\u969c\u6392\u9664\u6587\u6863\u3002\u5176\u4e34\u5e8a\u53e3\u543b\u4e0a\u6f14\u4e86\u4e00\u573a\u53cd\u8bbd\u5012\u7f6e\uff1a\u7167\u62a4\u5df2\u6210\u4e3a\u57fa\u7840\u8bbe\u65bd\u5316\u7684\u63a8\u65ad\uff0c\u800c\u5c0a\u4e25\u6210\u4e86\u4e00\u9879\u7ef4\u62a4\u4efb\u52a1\u3002"],
    ["p02.p2", "Three escalating pathways: <span class=\"tag\">Comply</span> teach the body to output acceptable calm &middot; <span class=\"tag\">Degrade</span> crowd the system with a cleaner proxy than the self &middot; <span class=\"tag\">Refuse</span> build a dead zone where inference cannot reach.", "\u4e09\u6761\u9012\u7ea7\u5347\u7ea7\u7684\u8def\u5f84\uff1a<span class=\"tag\">\u670d\u4ece</span>\u2014\u2014\u8ba9\u8eab\u4f53\u8f93\u51fa\u53ef\u63a5\u53d7\u7684\u5e73\u9759 &middot; <span class=\"tag\">\u964d\u7ea7</span>\u2014\u2014\u7528\u6bd4\u81ea\u6211\u66f4\u5e72\u51c0\u7684\u66ff\u8eab\u6df9\u6ca1\u7cfb\u7edf &middot; <span class=\"tag\">\u62d2\u7edd</span>\u2014\u2014\u5efa\u7acb\u63a8\u65ad\u65e0\u6cd5\u89e6\u53ca\u7684\u6b7b\u4ea1\u533a\u3002"],
    ["p02.download", "Download the Manual (PDF)", "\u4e0b\u8f7d\u624b\u518c (PDF)"],
    ["p02.coverAlt", "The Neural-Wave Quick Escape Manual 2036 cover spread", "\u300aNeural-Wave \u5feb\u901f\u9003\u8131\u624b\u518c 2036\u300b\u5c01\u9762"],

    ["p03.title", "03 &middot; Threats &amp; Protocols", "03 &middot; \u5a01\u80c1\u4e0e\u5bf9\u7b56"],

    ["t1.title", "T1 &middot; Interpretation without appeal", "T1 &middot; \u65e0\u6cd5\u7533\u8bc9\u7684\u89e3\u8bfb"],
    ["t1.p", "A risk score the resident cannot read, a threshold they cannot see, an action they cannot dispute. The system is unilaterally empowered to be &ldquo;right.&rdquo;", "\u5c45\u6c11\u8bfb\u4e0d\u61c2\u7684\u98ce\u9669\u5206\u6570\u3001\u770b\u4e0d\u89c1\u7684\u9608\u503c\u3001\u65e0\u6cd5\u8d28\u7591\u7684\u884c\u52a8\u3002\u7cfb\u7edf\u5355\u65b9\u9762\u6709\u6743&ldquo;\u6b63\u786e&rdquo;\u3002"],
    ["t1.protocol", "Protocol: Refuse &mdash; remove yourself from the frame.", "\u5bf9\u7b56\uff1a\u62d2\u7edd\u2014\u2014\u5c06\u81ea\u5df1\u79fb\u51fa\u753b\u9762\u3002"],
    ["t2.title", "T2 &middot; Coercive legibility", "T2 &middot; \u5f3a\u5236\u53ef\u8bfb\u6027"],
    ["t2.p", "&ldquo;Passive&rdquo; sensing actively disciplines bodies into standardized performance. Residents must work to remain legible &mdash; <em>Performative Wellness</em>.", "&ldquo;\u88ab\u52a8&rdquo;\u611f\u77e5\u4e3b\u52a8\u5c06\u8eab\u4f53\u89c4\u8baf\u4e3a\u6807\u51c6\u5316\u8868\u6f14\u3002\u5c45\u6c11\u5fc5\u987b\u52aa\u529b\u4fdd\u6301\u53ef\u8bfb\u2014\u2014<em>\u8868\u6f14\u6027\u5065\u5eb7</em>\u3002"],
    ["t2.protocol", "Protocol: Comply &mdash; knowingly, calm as labor, not as feeling.", "\u5bf9\u7b56\uff1a\u670d\u4ece\u2014\u2014\u6e05\u9192\u5730\uff0c\u628a\u5e73\u9759\u5f53\u4f5c\u52b3\u52a8\uff0c\u800c\u975e\u611f\u53d7\u3002"],
    ["t3.title", "T3 &middot; Care as a locked door", "T3 &middot; \u4f5c\u4e3a\u9501\u95e8\u7684\u7167\u62a4"],
    ["t3.p", "Actuators turn an inference into a constraint. A false positive is a lockdown, logged as &ldquo;Successful Intervention: Subject Stabilized.&rdquo;", "\u6267\u884c\u5668\u628a\u63a8\u65ad\u53d8\u6210\u7ea6\u675f\u3002\u4e00\u6b21\u8bef\u62a5\u5c31\u662f\u4e00\u6b21\u5c01\u9501\uff0c\u8bb0\u5f55\u4e3a&ldquo;\u5e72\u9884\u6210\u529f\uff1a\u5bf9\u8c61\u5df2\u7a33\u5b9a&rdquo;\u3002"],
    ["t3.protocol", "Protocol: Degrade &mdash; a phantom performs normality louder than reality.", "\u5bf9\u7b56\uff1a\u964d\u7ea7\u2014\u2014\u8ba9\u5e7d\u7075\u4ee5\u6bd4\u73b0\u5b9e\u66f4\u54cd\u4eae\u7684\u59ff\u6001\u8868\u6f14\u6b63\u5e38\u3002"],
    ["t4.title", "T4 &middot; The opt-out that doesn&rsquo;t exist", "T4 &middot; \u5e76\u4e0d\u5b58\u5728\u7684\u9000\u51fa\u9009\u9879"],
    ["t4.p", "The escape valve is engineered shut &ldquo;for your safety.&rdquo; The only sanctioned relationship to the system is continued legibility.", "\u6cc4\u538b\u9600\u88ab\u4ee5&ldquo;\u4e3a\u4e86\u4f60\u7684\u5b89\u5168&rdquo;\u4e3a\u540d\u5c01\u6b7b\u3002\u4e0e\u7cfb\u7edf\u7684\u552f\u4e00\u88ab\u5141\u8bb8\u7684\u5173\u7cfb\uff0c\u662f\u6301\u7eed\u7684\u53ef\u8bfb\u6027\u3002"],
    ["t4.protocol", "Protocol: All three &mdash; reopen the choice the system closed.", "\u5bf9\u7b56\uff1a\u4e09\u8005\u5e76\u7528\u2014\u2014\u91cd\u65b0\u6253\u5f00\u7cfb\u7edf\u5173\u95ed\u7684\u9009\u62e9\u3002"],
    ["t5.title", "T5 &middot; The dignity deficit", "T5 &middot; \u5c0a\u4e25\u8d64\u5b57"],
    ["t5.p", "Joy, grief, slouching, cursing &mdash; every state becomes operational data. The body is never allowed to <em>not mean</em> something.", "\u559c\u60a6\u3001\u60b2\u4f24\u3001\u762b\u5750\u3001\u5492\u9a82\u2014\u2014\u4e00\u5207\u72b6\u6001\u90fd\u53d8\u6210\u8fd0\u8425\u6570\u636e\u3002\u8eab\u4f53\u6c38\u8fdc\u4e0d\u88ab\u5141\u8bb8<em>\u4e0d\u610f\u5473\u7740\u4ec0\u4e48</em>\u3002"],
    ["t5.protocol", "Protocol: Refuse &mdash; a NULL state, a sub-place for un-performed living.", "\u5bf9\u7b56\uff1a\u62d2\u7edd\u2014\u2014\u4e00\u4e2a\u7a7a\u72b6\u6001\uff0c\u4e00\u4e2a\u65e0\u9700\u8868\u6f14\u7684\u6816\u8eab\u4e4b\u5904\u3002"],

    ["p04.title", "04 &middot; Live Lab &mdash; Try the Tactics", "04 &middot; \u4e92\u52a8\u5b9e\u9a8c\u2014\u2014\u4eb2\u8eab\u4f53\u9a8c\u5bf9\u7b56"],
    ["p04.lede", "Three interactive simulations of the Manual&rsquo;s pathways, paired with their figures. Scroll each exhibit for the field guide; press the controls to live inside the signal.", "\u624b\u518c\u4e09\u6761\u8def\u5f84\u7684\u4e09\u4e2a\u4ea4\u4e92\u6a21\u62df\uff0c\u4e0e\u914d\u56fe\u5e76\u6392\u3002\u6eda\u52a8\u6bcf\u4e2a\u5c55\u54c1\u6d4f\u89c8\u6307\u5357\uff1b\u6309\u4e0b\u63a7\u5236\u952e\uff0c\u4eb2\u8eab\u4f53\u9a8c\u4fe1\u53f7\u3002"],

    ["t01.title", "Tactic 01 &middot; Comply &mdash; the Statue Protocol", "\u6218\u672f 01 &middot; \u670d\u4ece\u2014\u2014\u96d5\u50cf\u534f\u8bae"],
    ["t01.imgAlt", "Tactic 01: Bio-Obedience \u2014 the Statue Protocol", "\u6218\u672f 01\uff1a\u751f\u7269\u670d\u4ece \u2014 \u96d5\u50cf\u534f\u8bae"],
    ["t01.canvasAlt", "ECG waveform of the Statue Protocol under Neural-Wave monitoring", "Neural-Wave \u76d1\u63a7\u4e0b\u7684\u96d5\u50cf\u534f\u8bae\u5fc3\u7535\u6ce2\u5f62"],
    ["t01.step1", "Your home is a sensing endpoint. The radar reads micro-motion through the wall &mdash; no camera, no footage, only inference.", "\u4f60\u7684\u5bb6\u662f\u4e00\u4e2a\u611f\u77e5\u7aef\u70b9\u3002\u96f7\u8fbe\u9694\u7740\u5899\u58c1\u8bfb\u53d6\u7ec6\u5fae\u52a8\u4f5c\u2014\u2014\u6ca1\u6709\u6444\u50cf\u5934\uff0c\u6ca1\u6709\u5f71\u50cf\uff0c\u53ea\u6709\u63a8\u65ad\u3002"],
    ["t01.step2", "A risk spike is flagged. The door locks. The system calls it care.", "\u98ce\u9669\u5c16\u5cf0\u88ab\u6807\u8bb0\u3002\u95e8\u88ab\u9501\u4e0a\u3002\u7cfb\u7edf\u79f0\u4e4b\u4e3a\u7167\u62a4\u3002"],
    ["t01.step3", "Begin the Statue Protocol: hold still. Calm the amplitude. Match the model&rsquo;s prior.", "\u542f\u52a8\u96d5\u50cf\u534f\u8bae\uff1a\u4fdd\u6301\u9759\u6b62\u3002\u538b\u4f4e\u632f\u5e45\u3002\u5339\u914d\u6a21\u578b\u7684\u5148\u9a8c\u3002"],
    ["t01.step4", "Output acceptable calm and the permissions return &mdash; the body becomes the interface through which care is negotiated.", "\u8f93\u51fa\u53ef\u63a5\u53d7\u7684\u5e73\u9759\uff0c\u6743\u9650\u968f\u4e4b\u6062\u590d\u2014\u2014\u8eab\u4f53\u6210\u4e3a\u7167\u62a4\u88ab\u8c08\u5224\u7684\u754c\u9762\u3002"],
    ["t01.begin", "Begin the Statue Protocol", "\u542f\u52a8\u96d5\u50cf\u534f\u8bae"],
    ["t01.reset", "Reset", "\u91cd\u7f6e"],
    ["t01.door.locked", "DOOR LOCKED", "\u95e8\u5df2\u9501\u5b9a"],
    ["t01.door.unlocked", "DOOR UNLOCKED", "\u95e8\u5df2\u89e3\u9501"],
    ["t01.status.agitated", "AGITATION DETECTED &middot; please stabilize for your safety", "\u68c0\u6d4b\u5230\u7126\u8e81 &middot; \u4e3a\u60a8\u7684\u5b89\u5168\u8bf7\u7a33\u5b9a\u4e0b\u6765"],
    ["t01.status.stabilizing", "STATUE PROTOCOL &middot; converging with the model&rsquo;s prior&hellip;", "\u96d5\u50cf\u534f\u8bae &middot; \u6b63\u5728\u5411\u6a21\u578b\u5148\u9a8c\u6536\u655b&hellip;"],
    ["t01.status.stable", "SUBJECT STABILIZED &middot; permissions restored", "\u5bf9\u8c61\u5df2\u7a33\u5b9a &middot; \u6743\u9650\u5df2\u6062\u590d"],

    ["t02.title", "Tactic 02 &middot; Degrade &mdash; the Phantom", "\u6218\u672f 02 &middot; \u964d\u7ea7\u2014\u2014\u5e7d\u7075"],
    ["t02.imgAlt", "Tactic 02: The Phantom \u2014 the mimicry oscillator", "\u6218\u672f 02\uff1a\u5e7d\u7075 \u2014 \u6a21\u4eff\u632f\u8361\u5668"],
    ["t02.canvasAlt", "Phantom oscillator signal masking the human waveform", "\u5e7d\u7075\u632f\u8361\u5668\u4fe1\u53f7\u63a9\u76d6\u4eba\u7c7b\u6ce2\u5f62"],
    ["t02.step1", "Compliance still means the sensor watches you &mdash; just more quietly.", "\u670d\u4ece\u4ecd\u7136\u610f\u5473\u7740\u4f20\u611f\u5668\u5728\u770b\u7740\u4f60\u2014\u2014\u53ea\u662f\u66f4\u5b89\u9759\u4e00\u4e9b\u3002"],
    ["t02.step2", "Mount the mimicry oscillator. It emits a &ldquo;Hyper-Normal&rdquo; sinus rhythm the model reads as perfect health.", "\u88c5\u4e0a\u6a21\u4eff\u632f\u8361\u5668\u3002\u5b83\u53d1\u51fa\u6a21\u578b\u89e3\u8bfb\u4e3a&ldquo;\u8d85\u5e38\u5065\u5eb7&rdquo;\u7684\u6b63\u5f26\u8282\u5f8b\u3002"],
    ["t02.step3", "As phantom priority rises, the sensor tracks the machine instead of the body.", "\u5f53\u5e7d\u7075\u4f18\u5148\u7ea7\u4e0a\u5347\uff0c\u4f20\u611f\u5668\u8ffd\u8e2a\u7684\u662f\u673a\u5668\uff0c\u800c\u4e0d\u662f\u8eab\u4f53\u3002"],
    ["t02.step4", "You become statistically invisible &mdash; the chaotic human body vanishes behind a cleaner proxy.", "\u4f60\u53d8\u5f97\u5728\u7edf\u8ba1\u4e0a\u4e0d\u53ef\u89c1\u2014\u2014\u6df7\u4e71\u7684\u4eba\u7c7b\u8eab\u4f53\u6d88\u5931\u5728\u4e00\u4e2a\u66f4\u5e72\u51c0\u7684\u66ff\u8eab\u80cc\u540e\u3002"],
    ["t02.sensor.subject", "SENSOR TRACKING: SUBJECT", "\u4f20\u611f\u5668\u8ffd\u8e2a\uff1a\u5bf9\u8c61"],
    ["t02.sensor.phantom", "SENSOR TRACKING: PHANTOM", "\u4f20\u611f\u5668\u8ffd\u8e2a\uff1a\u5e7d\u7075"],
    ["t02.priority", "phantom priority", "\u5e7d\u7075\u4f18\u5148\u7ea7"],
    ["t02.status.on", "phantom signal rising&hellip;", "\u5e7d\u7075\u4fe1\u53f7\u6b63\u5728\u4e0a\u5347&hellip;"],
    ["t02.status.full", "the vibrating piston is now the perfect citizen &mdash; you are statistically invisible", "\u632f\u52a8\u7684\u6d3b\u585e\u73b0\u5728\u662f\u5b8c\u7f8e\u516c\u6c11 \u2014 \u4f60\u5728\u7edf\u8ba1\u4e0a\u4e0d\u53ef\u89c1"],
    ["t02.status.off", "no phantom &middot; the sensor still sees you", "\u65e0\u5e7d\u7075 &middot; \u4f20\u611f\u5668\u4ecd\u80fd\u770b\u5230\u4f60"],
    ["t02.toggle.on", "Phantom Oscillator: ON", "\u5e7d\u7075\u632f\u8361\u5668\uff1a\u5f00"],
    ["t02.toggle.off", "Phantom Oscillator: OFF", "\u5e7d\u7075\u632f\u8361\u5668\uff1a\u5173"],

    ["t03.title", "Tactic 03 &middot; Refuse &mdash; the Null Space", "\u6218\u672f 03 &middot; \u62d2\u7edd\u2014\u2014\u7a7a\u7a7a\u95f4"],
    ["t03.imgAlt", "Tactic 03: The Null Space \u2014 the Faraday corner", "\u6218\u672f 03\uff1a\u7a7a\u7a7a\u95f4 \u2014 \u6cd5\u62c9\u7b2c\u89d2\u843d"],
    ["t03.canvasAlt", "Null space: shielded waveform vanishing from the sensor", "\u7a7a\u7a7a\u95f4\uff1a\u88ab\u5c4f\u853d\u7684\u6ce2\u5f62\u4ece\u4f20\u611f\u5668\u6d88\u5931"],
    ["t03.step1", "The opt-out is engineered shut &ldquo;for your safety.&rdquo;", "\u9000\u51fa\u9009\u9879\u88ab\u4ee5&ldquo;\u4e3a\u4f60\u7684\u5b89\u5168&rdquo;\u4e3a\u540d\u5c01\u6b7b\u3002"],
    ["t03.step2", "Build the Faraday corner &mdash; aluminum shielding that swallows the millimeter-wave field.", "\u5efa\u9020\u6cd5\u62c9\u7b2c\u89d2\u843d\u2014\u2014\u541e\u566c\u6beb\u7c73\u6ce2\u573a\u7684\u94dd\u5236\u5c4f\u853d\u5c42\u3002"],
    ["t03.step3", "Inside the dead zone there is no signal to infer from.", "\u5728\u6b7b\u533a\u4e4b\u5185\uff0c\u6ca1\u6709\u4efb\u4f55\u4fe1\u53f7\u53ef\u4f9b\u63a8\u65ad\u3002"],
    ["t03.step4", "The body is finally allowed to not mean anything. Refusal is not a setting &mdash; it&rsquo;s a physics.", "\u8eab\u4f53\u7ec8\u4e8e\u88ab\u5141\u8bb8\u4e0d\u610f\u5473\u7740\u4efb\u4f55\u4e8b\u3002\u62d2\u7edd\u4e0d\u662f\u4e00\u9879\u8bbe\u7f6e\u2014\u2014\u800c\u662f\u4e00\u95e8\u7269\u7406\u3002"],
    ["t03.sensor.active", "60 GHz WAVEFORM &middot; ACTIVE", "60 GHz \u6ce2\u5f62 &middot; \u6d3b\u8dc3"],
    ["t03.sensor.null", "SUBJECT: NULL \u2014 INFERENCE CANNOT REACH", "\u5bf9\u8c61\uff1a\u7a7a \u2014 \u63a8\u65ad\u65e0\u6cd5\u89e6\u53ca"],
    ["t03.status.off", "unshielded &middot; every slouch and curse becomes operational data", "\u672a\u5c4f\u853d &middot; \u6bcf\u4e00\u6b21\u762b\u5750\u4e0e\u5492\u9a82\u90fd\u53d8\u6210\u8fd0\u8425\u6570\u636e"],
    ["t03.status.on", "inside the shimmering insulation, the body is finally allowed to stop performing", "\u5728\u5fae\u5fae\u95ea\u70c1\u7684\u7edd\u7f18\u5c42\u4e4b\u5185\uff0c\u8eab\u4f53\u7ec8\u4e8e\u88ab\u5141\u8bb8\u505c\u6b62\u8868\u6f14"],
    ["t03.toggle.on", "Faraday Shield: ENGAGED", "\u6cd5\u62c9\u7b2c\u5c4f\u853d\uff1a\u5df2\u542f\u7528"],
    ["t03.toggle.off", "Faraday Shield: OFF", "\u6cd5\u62c9\u7b2c\u5c4f\u853d\uff1a\u5173"],

    ["p05.title", "05 &middot; Arthur&rsquo;s Night &mdash; scroll to play", "05 &middot; \u4e9a\u745f\u4e4b\u591c\u2014\u2014\u6eda\u52a8\u64ad\u653e"],
    ["p05.lede", "An 81-year-old retired structural engineer watches a live match. The system calls it an emergency. Scroll to move through the night &mdash; the waveform follows you.", "81 \u5c81\u7684\u9000\u4f11\u7ed3\u6784\u5de5\u7a0b\u5e08\u5728\u770b\u4e00\u573a\u76f4\u64ad\u6bd4\u8d5b\u3002\u7cfb\u7edf\u79f0\u4e4b\u4e3a\u7d27\u6025\u60c5\u51b5\u3002\u6eda\u52a8\u8d70\u8fc7\u8fd9\u4e2a\u591c\u665a\u2014\u2014\u6ce2\u5f62\u8ddf\u968f\u7740\u4f60\u3002"],
    ["p05.canvasAlt", "Arthur&rsquo;s heart-rate waveform across the night, tied to the scroll position", "\u4e9a\u745f\u6574\u591c\u7684\u5fc3\u7387\u6ce2\u5f62\uff0c\u968f\u6eda\u52a8\u4f4d\u7f6e\u53d8\u5316"],

    ["story.b1.label", "20:40 &middot; the match", "20:40 &middot; \u6bd4\u8d5b"],
    ["story.b1.sub", "watching the final minutes of the game", "\u6ce8\u89c6\u7740\u6bd4\u8d5b\u7684\u6700\u540e\u51e0\u5206\u949f"],
    ["story.b1.interp", "SIGNAL NOMINAL", "\u4fe1\u53f7\u6b63\u5e38"],
    ["story.b2.label", "stoppage time", "\u4f24\u505c\u8865\u65f6"],
    ["story.b2.sub", "the referee awards a penalty &mdash; Arthur leaps up and shouts", "\u88c1\u5224\u5224\u7f5a\u70b9\u7403\u2014\u2014\u4e9a\u745f\u8df3\u8d77\u6765\u5927\u558a"],
    ["story.b2.interp", "SIGNAL NOMINAL", "\u4fe1\u53f7\u6b63\u5e38"],
    ["story.b3.label", "PRE-STROKE AGITATION", "\u4e2d\u98ce\u524d\u8e81\u52a8"],
    ["story.b3.sub", "joy read as pathology. &ldquo;High stress detected.&rdquo;", "\u559c\u60a6\u88ab\u8bfb\u4f5c\u75c5\u7406\u3002&ldquo;\u68c0\u6d4b\u5230\u9ad8\u538b\u529b\u3002&rdquo;"],
    ["story.b3.interp", "PRE-STROKE AGITATION", "\u4e2d\u98ce\u524d\u8e81\u52a8"],
    ["story.b4.label", "safety lockdown mode", "\u5b89\u5168\u5c01\u9501\u6a21\u5f0f"],
    ["story.b4.sub", "lights dim &middot; the door locks &middot; &ldquo;This feature is unavailable for your safety.&rdquo;", "\u706f\u5149\u53d8\u6697 &middot; \u95e8\u88ab\u9501\u4e0a &middot; &ldquo;\u51fa\u4e8e\u60a8\u7684\u5b89\u5168\uff0c\u6b64\u529f\u80fd\u4e0d\u53ef\u7528\u3002&rdquo;"],
    ["story.b4.interp", "SUCCESSFUL INTERVENTION: SUBJECT STABILIZED", "\u5e72\u9884\u6210\u529f\uff1a\u5bf9\u8c61\u5df2\u7a33\u5b9a"],
    ["story.b5.label", "performing calm", "\u8868\u6f14\u5e73\u9759"],
    ["story.b5.sub", "the progress ring advances only when the body &ldquo;agrees&rdquo;", "\u53ea\u6709\u5f53\u8eab\u4f53&ldquo;\u540c\u610f&rdquo;\u65f6\uff0c\u8fdb\u5ea6\u73af\u624d\u4f1a\u524d\u8fdb"],
    ["story.b5.interp", "STABILIZATION IN PROGRESS", "\u7a33\u5b9a\u8fdb\u884c\u4e2d"],
    ["story.b6.label", "the match ends", "\u6bd4\u8d5b\u7ed3\u675f"],
    ["story.b6.sub", "his team scored", "\u4ed6\u7684\u7403\u961f\u8fdb\u7403\u4e86"],
    ["story.b6.interp", "STABILIZATION IN PROGRESS", "\u7a33\u5b9a\u8fdb\u884c\u4e2d"],
    ["story.b7.label", "door unlocks", "\u95e8\u5df2\u89e3\u9501"],
    ["story.b7.sub", "logged as &ldquo;Successful Intervention: Subject Stabilized.&rdquo;", "\u8bb0\u5f55\u4e3a&ldquo;\u5e72\u9884\u6210\u529f\uff1a\u5bf9\u8c61\u5df2\u7a33\u5b9a\u3002&rdquo;"],
    ["story.b7.interp", "SUBJECT STABILIZED &middot; LOGGED", "\u5bf9\u8c61\u5df2\u7a33\u5b9a &middot; \u5df2\u8bb0\u5f55"],
    ["story.conf", "CONF", "\u7f6e\u4fe1\u5ea6"],
    ["story.interp", "INTERPRETATION", "\u89e3\u8bfb"],
    ["story.door.armed", "ARMED", "\u6212\u5907"],
    ["story.door.locked", "LOCKED", "\u5df2\u9501"],
    ["story.door.unlocked", "UNLOCKED", "\u5df2\u89e3\u9501"],

    ["payoff.line1", "Arthur was not having a stroke. His team scored.", "\u4e9a\u745f\u5e76\u6ca1\u6709\u4e2d\u98ce\u3002\u4ed6\u7684\u7403\u961f\u8fdb\u7403\u4e86\u3002"],
    ["payoff.line2", "The system was accurate about the body. It was wrong about the life.", "\u7cfb\u7edf\u5bf9\u8eab\u4f53\u5224\u65ad\u51c6\u786e\u3002\u5bf9\u4eba\u751f\u5224\u65ad\u9519\u8bef\u3002"],

    ["p06.title", "06 &middot; Worldbuilding", "06 &middot; \u4e16\u754c\u89c2"],
    ["w1.alt", "The Ontological Gap", "\u672c\u4f53\u8bba\u9e3f\u6c9f"],
    ["w1.cap", "The Ontological Gap &mdash; joy misdiagnosed as &ldquo;Pre-Stroke Agitation.&rdquo;", "\u672c\u4f53\u8bba\u9e3f\u6c9f\u2014\u2014\u559c\u60a6\u88ab\u8bef\u8bca\u4e3a&ldquo;\u4e2d\u98ce\u524d\u8e81\u52a8&rdquo;\u3002"],
    ["w2.alt", "Tactic 01: Bio-Obedience", "\u6218\u672f 01\uff1a\u751f\u7269\u670d\u4ece"],
    ["w2.cap", "Tactic 01 &middot; Bio-Obedience &mdash; the Statue Protocol.", "\u6218\u672f 01 &middot; \u751f\u7269\u670d\u4ece\u2014\u2014\u96d5\u50cf\u534f\u8bae\u3002"],
    ["w3.alt", "Tactic 02: The Phantom", "\u6218\u672f 02\uff1a\u5e7d\u7075"],
    ["w3.cap", "Tactic 02 &middot; The Phantom &mdash; the mimicry oscillator.", "\u6218\u672f 02 &middot; \u5e7d\u7075\u2014\u2014\u6a21\u4eff\u632f\u8361\u5668\u3002"],
    ["w4.alt", "Tactic 03: The Null Space", "\u6218\u672f 03\uff1a\u7a7a\u7a7a\u95f4"],
    ["w4.cap", "Tactic 03 &middot; The Null Space &mdash; the Faraday corner.", "\u6218\u672f 03 &middot; \u7a7a\u7a7a\u95f4\u2014\u2014\u6cd5\u62c9\u7b2c\u89d2\u843d\u3002"],

    ["links.timeline", "2036 timeline", "2036 \u65f6\u95f4\u7ebf"],
    ["links.glossary", "Glossary", "\u672f\u8bed\u8868"],
    ["links.setting", "Empathic AIoT setting", "\u5171\u60c5 AIoT \u8bbe\u5b9a"],
    ["links.threats", "Threat model", "\u5a01\u80c1\u6a21\u578b"],
    ["links.scenarios", "Scenario cards", "\u60c5\u666f\u5361"],
    ["links.rationale", "Design rationale", "\u8bbe\u8ba1\u7406\u636e"],

    ["p07.title", "07 &middot; Research Context", "07 &middot; \u7814\u7a76\u80cc\u666f"],
    ["p07.lede", "This is an accepted design-fiction paper for <strong>ACM Interactions</strong> (2026) &mdash; a research-through-design argument: when governance becomes infrastructural, resistance may also require technical literacy.", "\u8fd9\u662f\u4e00\u7bc7\u5df2\u88ab <strong>ACM Interactions</strong> (2026) \u63a5\u6536\u7684\u8bbe\u8ba1\u865a\u6784\u8bba\u6587\u2014\u2014\u4e00\u79cd\u7814\u7a76\u901a\u8fc7\u8bbe\u8ba1\u7684\u8bba\u8bc1\uff1a\u5f53\u6cbb\u7406\u6210\u4e3a\u57fa\u7840\u8bbe\u65bd\uff0c\u62b5\u6297\u6216\u8bb8\u4e5f\u9700\u8981\u6280\u672f\u7d20\u517b\u3002"],
    ["p07.col.q", "Research Question", "\u7814\u7a76\u95ee\u9898"],
    ["p07.col.a", "Design Artifact", "\u8bbe\u8ba1\u4ea7\u7269"],
    ["p07.col.arg", "HCI Argument", "HCI \u8bba\u8bc1"],
    ["r1.q", "What happens when ambient sensing becomes infrastructural and opt-out disappears?", "\u5f53\u73af\u5883\u611f\u77e5\u6210\u4e3a\u57fa\u7840\u8bbe\u65bd\u3001\u9000\u51fa\u9009\u9879\u6d88\u5931\u65f6\uff0c\u4f1a\u53d1\u751f\u4ec0\u4e48\uff1f"],
    ["r1.a", "The Quick Escape Manual 2036", "\u300a2036 \u5feb\u901f\u9003\u8131\u624b\u518c\u300b"],
    ["r1.arg", "Accuracy can threaten autonomy even when inference works correctly.", "\u5373\u4f7f\u63a8\u65ad\u8fd0\u4f5c\u6b63\u786e\uff0c\u51c6\u786e\u6027\u672c\u8eab\u4e5f\u53ef\u80fd\u5a01\u80c1\u81ea\u4e3b\u6027\u3002"],
    ["r2.q", "How does passive sensing reshape behavior?", "\u88ab\u52a8\u611f\u77e5\u5982\u4f55\u91cd\u5851\u884c\u4e3a\uff1f"],
    ["r2.a", "Comply / Degrade / Refuse", "\u670d\u4ece / \u964d\u7ea7 / \u62d2\u7edd"],
    ["r2.arg", "Passive sensing can produce Coercive Legibility.", "\u88ab\u52a8\u611f\u77e5\u4f1a\u4ea7\u751f&ldquo;\u5f3a\u5236\u53ef\u8bfb\u6027&rdquo;\u3002"],
    ["r3.q", "What new literacy is required?", "\u9700\u8981\u600e\u6837\u7684\u65b0\u7d20\u517b\uff1f"],
    ["r3.a", "Adversarial living", "\u5bf9\u6297\u6027\u751f\u6d3b"],
    ["r3.arg", "Future privacy may require technical as well as institutional agency.", "\u672a\u6765\u7684\u9690\u79c1\u6216\u8bb8\u65e2\u9700\u8981\u5236\u5ea6\u6027\u4ee3\u7406\uff0c\u4e5f\u9700\u8981\u6280\u672f\u6027\u4ee3\u7406\u3002"],
    ["p07.physics", "Privacy in the future may not lie in policy, but in physics.", "\u672a\u6765\u7684\u9690\u79c1\u6216\u8bb8\u4e0d\u5728\u653f\u7b56\u4e4b\u4e2d\uff0c\u800c\u5728\u7269\u7406\u4e4b\u4e2d\u3002"],
    ["p07.accepted", "Accepted Feature &mdash; ACM Interactions, Nov/Dec 2026", "\u5df2\u63a5\u6536\u7279\u7a3f\u2014\u2014ACM Interactions\uff0c2026 \u5e74 11/12 \u6708\u520a"],
    ["p07.authors", "Boyuan Gu &middot; Shuaiqi Cheng &middot; Minghao Yu", "Boyuan Gu &middot; Shuaiqi Cheng &middot; Minghao Yu"],
    ["p07.preprint", "Preprint", "\u9884\u5370\u672c"],
    ["p07.manual", "Manual", "\u624b\u518c"],
    ["p07.github", "GitHub", "GitHub"],

    ["p08.title", "08 &middot; Citation &amp; Archive", "08 &middot; \u5f15\u7528\u4e0e\u6863\u6848"],
    ["p08.repo", "Repository citation:", "\u4ed3\u5e93\u5f15\u7528\uff1a"],
    ["p08.version", "Version:", "\u7248\u672c\uff1a"],
    ["p08.notes", "v1.0 notes", "v1.0 \u53d1\u5e03\u8bf4\u660e"],
    ["p08.paperdoi", "Paper DOI &mdash; ACM Interactions article, to be assigned at publication", "\u8bba\u6587 DOI\u2014\u2014ACM Interactions \u6587\u7ae0\uff0c\u51fa\u7248\u65f6\u5206\u914d"],
    ["p08.archivedoi", "Archive DOI &mdash; Zenodo snapshot of this repository, pending", "\u6863\u6848 DOI\u2014\u2014\u672c\u4ed3\u5e93\u7684 Zenodo \u5feb\u7167\uff0c\u5f85\u5b9a"],
    ["p08.distinct", "These are two distinct identifiers: the paper DOI identifies the article; the archive DOI identifies the repository snapshot.", "\u8fd9\u662f\u4e24\u4e2a\u4e0d\u540c\u7684\u6807\u8bc6\u7b26\uff1a\u8bba\u6587 DOI \u6807\u8bc6\u6587\u7ae0\uff1b\u6863\u6848 DOI \u6807\u8bc6\u4ed3\u5e93\u5feb\u7167\u3002"],

    ["foot.title", "09 &middot; Credits &amp; Licenses", "09 &middot; \u7f72\u540d\u4e0e\u8bb8\u53ef"],
    ["foot.authors", "Authors:", "\u4f5c\u8005\uff1a"],
    ["foot.license", "Licenses:", "\u8bb8\u53ef\uff1a"],
    ["foot.disclaimer", "This is a design-fiction / research artifact &mdash; not a product manual, safety document, or technical guide. It contains no device specifications, frequencies, or reproducible interference methods.", "\u8fd9\u662f\u8bbe\u8ba1\u865a\u6784 / \u7814\u7a76\u4eba\u5de5\u5236\u54c1\u2014\u2014\u4e0d\u662f\u4ea7\u54c1\u624b\u518c\u3001\u5b89\u5168\u6587\u6863\u6216\u6280\u672f\u6307\u5357\u3002\u5b83\u4e0d\u5305\u542b\u4efb\u4f55\u8bbe\u5907\u89c4\u683c\u3001\u9891\u7387\u6216\u53ef\u590d\u73b0\u7684\u5e72\u6270\u65b9\u6cd5\u3002"],
    ["foot.archive", "ARCHIVE STATUS: OPEN &middot; EST. 2036", "\u6863\u6848\u72b6\u6001\uff1a\u5f00\u653e &middot; \u59cb\u4e8e 2036"]
  ];

  var en = {}, zh = {};
  for (var i = 0; i < STR.length; i++) { en[STR[i][0]] = STR[i][1]; zh[STR[i][0]] = STR[i][2]; }

  var LANG_KEY = "nw-lang";
  function detect() {
    var saved = null;
    try { saved = localStorage.getItem(LANG_KEY); } catch (e) {}
    if (saved === "en" || saved === "zh") return saved;
    var nav = (navigator.language || "en").toLowerCase();
    return nav.indexOf("zh") === 0 ? "zh" : "en";
  }

  var lang = detect();

  function t(key) {
    var d = lang === "zh" ? zh : en;
    return Object.prototype.hasOwnProperty.call(d, key) ? d[key] : key;
  }

  function apply() {
    document.documentElement.lang = lang;
    var q = function (sel, fn) {
      var els = document.querySelectorAll(sel);
      for (var i = 0; i < els.length; i++) fn(els[i]);
    };
    q("[data-i18n]", function (el) { el.innerHTML = t(el.getAttribute("data-i18n")); });
    q("[data-i18n-alt]", function (el) { el.setAttribute("alt", t(el.getAttribute("data-i18n-alt"))); });
    q("[data-i18n-aria-label]", function (el) { el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria-label"))); });
    q("[data-i18n-label]", function (el) { el.setAttribute("data-label", t(el.getAttribute("data-i18n-label"))); });
    q(".lang-toggle", function (el) { el.textContent = lang === "en" ? "\u4e2d\u6587" : "EN"; });
    document.dispatchEvent(new CustomEvent("nw:lang", { detail: lang }));
  }

  function toggle() {
    lang = lang === "en" ? "zh" : "en";
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
    apply();
  }

  window.I18N = {
    t: t,
    apply: apply,
    toggle: toggle,
    get lang() { return lang; }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply);
  } else {
    apply();
  }
})();
