import { Product, TechSpec } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'phone-3',
    name: 'PHONE ( 3 )',
    tagline: 'Take your best photos with four 50 MP cameras.',
    description: 'Our flagship modular communication platform. Precision engineered with a transparent high-durability backing, integrated glyph interface elements, and custom haptic feedback systems.',
    price: 999,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLslbbcswicFkTN1V3-MbCBURBRNS4m1F5bSKrIbujN638gCk1IjKDdUMmcYJeVF-jjy4c7UzRiurc8_6xD4udl1cm0DEM0ds6wOVGfg70DYqg8kKg984YOx4qd9jtPElkKON72pHdIADnGQWcQgNblIrg2XtHwNxiUxv4gXVtonHKdKFEvlZGGaiSSNqOvdDQns7vpZl2RAe2uE_JYNZKgCXb6TDFrsX9IjFTIshwOiUeN2Siju2jjjzUQ',
    category: 'phone',
    series: 'SERIES-04 / 2024',
    refId: 'PH_03_W',
    specs: {
      'Display': '6.7" Flexible OLED, LTPO 1-120Hz, HDR10+, 1600 nits peak',
      'Processor': 'Custom DOT Octa-Core Silicon v3 with Machine Learning Co-processor',
      'Cameras': 'Four 50 MP sensors (Wide, Ultra-wide, 3x Telephoto, 5x Periscope) with continuous optical alignment',
      'Battery': '5000 mAh with ultra-low thermal 45W charging, 15W wireless, reverse charging',
      'Chassis': 'Bead-blasted recycled aluminum, liquid-cooled internals, chemical-strengthened front and rear glass',
      'OS': 'DOT-OS 3.0 based on RT-Core'
    }
  },
  {
    id: 'headphone-1',
    name: 'HEADPHONE ( 1 )',
    tagline: 'Custom sound with tuning by KEF.',
    description: 'An architectural acoustic system. Incorporating dual 50mm diamond-like carbon drivers, customized pressure-relief chambers, and a seamless bead-blasted aluminum skeleton.',
    price: 499,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLtvt8opIhKHTSdLwfC53U-g8p8rbatFLWhjP12kUWxPZvAgabcnCTU_qDgfxOzI2VK4e8fgGEZfyVG3RuuKixGKeBl5l6gUc-cyLeRmxMaQaujBwje0zeY0QzQBtaT7uIQ-GWRpfaHtMa3Nm7FMkDLCm8q5T3DdRShQlqN4cCPhtJsdSAX1rfDKYG-CHPV6czGSSZXZeBtIgzdQZ6bawl54aROs_9QTFrFZCN27hWteNxXtZIHEXqjxrEk',
    category: 'audio',
    series: 'CO-OP_01',
    refId: 'REF_ID: HP_A1',
    specs: {
      'Driver Unit': '50mm Custom Diamond-like Carbon Dynamic Transducers',
      'Tuning': 'Signature acoustic signature co-developed with KEF Engineers',
      'Isolation': 'Adaptable Hybrid Active Noise Cancellation exceeding 45dB peak',
      'Battery': 'Up to 55 hours playback with high-speed Type-C charging',
      'Materials': 'Anodized aluminum frame, high-grade memory foam with ecological knit fabric',
      'Connectivity': 'Bluetooth 5.3 with ultra-low latency spatial transmission, 3.5mm passive bypass'
    }
  },
  {
    id: 'phone-4a',
    name: 'PHONE ( 4A )',
    tagline: 'Essential notifications simplified.',
    description: 'A compact and focused iteration. Stripped of excess to deliver flawless performance and raw mechanical aesthetics with a monochrome, high-contrast glyph array.',
    price: 599,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLvNnWsT4AHnK1OZeCuFGAzDdc2Lh6avXLYL_y9DHt1cefATTlhtEb6rKtTWegbS1VJQiEq4Ot97I4xQNSnTNJwF8N4nEJPP4Rn0LaEvn8yEltoMMOk7SwPWTVQ7ku_OLLeqcrv7njOPoY4VjcHm5oL2Vp4RuY_65QyJU3pKzIKhwZTBovZ5UF36NcGglN4bfbmb3erHJQNeXTRYgS06zIkN8PzTvZEAm0UCwprzsOmKmmnFfAgw13T3UQo',
    category: 'phone',
    series: 'SERIES-02 / 2024',
    refId: 'PH_4A_W',
    specs: {
      'Display': '6.1" OLED, 90Hz, 1000 nits contrast peak',
      'Processor': 'Octa-Core Energy-Efficient SoC Studio Build',
      'Camera': 'Dual 50 MP (Wide and Ultra-wide) with hybrid stabilization',
      'Key Feature': 'Tactile Glyph System with 8 individual illumination blocks for customizable patterns',
      'Materials': 'Biodegradable-infused polymer backend with glass front panel protection'
    }
  },
  {
    id: 'ear-3',
    name: 'EAR ( 3 )',
    tagline: 'Super mic technology for pure speech delivery.',
    description: 'Miniaturized audio perfection. Weighing just 4.2g per earbud, containing custom 11mm dynamic drivers and an ultra-isolated dual-chamber architecture.',
    price: 149,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLtqzLHl_wnhsYby2zE41_uTU9IOAt6zviwqHyzvbwEwnkJ3DZ0avOX-YjNoHTyaNcnMgfi_JjOEpo6pu6OwO-6Q4grAMa1wnW3zf0MiL305MzH85FqbVA5rpbTzyC3tl9dhVhpuD-KQmjrefatvc-epP3DjwxRwzCp3OJdUhz502CY-aY0Fp22vVK6KSKI_w3rnl6lP1ws05R6rxEMPEwejJYQ28L_1b9iDQxWjmtygPB41T7KsGR0l1p4o',
    category: 'audio',
    series: 'SERIES-03',
    refId: 'EAR_03_CLR',
    specs: {
      'Drivers': '11mm Custom Ceramic drivers for crystal clear treble and deep sub-bass',
      'Microphones': 'Tri-mic system per earbud with smart wind & background isolation algorithms',
      'Playtime': 'Up to 36 hours total with premium sleek charging case',
      'Water Resistance': 'IP54 certified (earbuds), IP55 certified (charging container)'
    }
  },
  {
    id: 'headphone-a',
    name: 'HEADPHONE ( A )',
    tagline: 'High fidelity in lightweight form.',
    description: 'Designed for daily rhythm. Bringing premium 40mm transducers and a collapsible design that fits into an ultra-slim protective sleeve.',
    price: 249,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLs6rNo6kcitYqRBSfkRt8XUHItE2XBIYLqdwnN5cdRhHJiypFiVFdXhn5w1nNkziyn8WtpbSstrAALLg8gHNlmqDxoMHNaGK1BuJKblwP4KgpFX33mdeknMdyXhuBbFIZDV9vWXNRAqQX13aNUR63Y9C-0bn_WPL9HIDkuAXl3ldpqY6plRwOWUkVsarE-ayhBQ31A-qGypAW5A-apxvPQB7QTyfeweLwVJvRGJYdsuu3h6cGd2cAoqp_Ix',
    category: 'audio',
    series: 'SERIES-A',
    refId: 'HP_A_BLK',
    specs: {
      'Drivers': '40mm custom bio-cellulose diaphragm dynamic drivers',
      'Noise Cancelling': 'Hybrid Feed-Forward ANC with Transparent Ambient pass-through mode',
      'Battery Life': 'Up to 45 hours total runtime on a single charge',
      'Weight': 'Just 210 grams for fatigue-free listening over long days'
    }
  }
];

export const TECH_SPECS: TechSpec[] = [
  {
    id: 'spec-mate',
    code: 'TECH_SPEC_01',
    title: 'MATERIALITY',
    description: 'Precision-milled anodized aluminum chassis. Chemical-tempered glass interfaces with 40px depth perception.',
    details: [
      'Chassis: Aerospace-grade 6000 series aluminum, anodized for optimal micro-abrasion resistance.',
      'Glass Elements: High-silica aluminosilicate formulation, bead-blasted to achieve a uniform matte finish that diffuses internal LED illumination.',
      'Core Gaskets: Liquid silicone rubber injected at high pressure to seal ingress seams without visible external bevels.',
      'Ecological footprint: 100% recycled aluminum framework combined with bio-attributed polymers.'
    ]
  },
  {
    id: 'spec-inte',
    code: 'TECH_SPEC_02',
    title: 'INTERFACE',
    description: 'Zero-latency haptic feedback loops. Custom DOT-OS environment with dot-matrix typography at its core.',
    details: [
      'Haptic Engine: Symmetric, dual-resonant linear actuators delivering targeted feedback on both vertical axis limits.',
      'Visual Matrix: Low-temperature polycrystalline silicon refresh with system-synchronized refresh curves.',
      'Sub-Display Glyph Array: 120 individually mapped light bars producing microsecond pulse-width modulated luminescence.',
      'Interactive Sound Matrix: Fully acoustic UI alerts recorded on physical modular analog synthesizers.'
    ]
  },
  {
    id: 'spec-acou',
    code: 'TECH_SPEC_03',
    title: 'ACOUSTICS',
    description: 'Tuning by KEF. 50mm diamond-like carbon drivers. Active noise suppression exceeding 45dB.',
    details: [
      'Transducer: Vapor-deposition diamond-like carbon overlaying high-elasticity bio-cellulose domes.',
      'Acoustic Calibration: Co-signed by KEF engineering labs using multi-dimensional polar response mapping.',
      'Noise Controller: Quad-core ANC DSP sampling exterior sound pressure at 192,000 cycles per second.',
      'High-Resolution Audio Codecs: Full support for 24-bit/96kHz non-destructive transmission protocols.'
    ]
  }
];
