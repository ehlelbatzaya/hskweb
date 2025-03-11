/**
 * Хятад үгсийн өгөгдөл
 */
const WORDS = [
    { 
        id: 1,
        chinese: '逐步',
        pinyin: 'zhú bù',
        mongolian: 'Алхам алхмаар',
        translation: 'Алхам алхмаар, үе шаттайгаар',
        description: 'Энэ үг нь ямар нэгэн ажил эсвэл үйл явц аажмаар, үе шаттай хийгдэж байгааг илэрхийлдэг. Англи хэлээр "step by step" гэж орчуулах боломжтой. Жишээ нь, төсөл эсвэл ажлыг нэг дор биш, харин дараалсан алхамуудаар хэрэгжүүлэхэд энэ үгийг хэрэглэнэ.',
        example: '我们需要逐步实施这个计划。',
        examplePinyin: 'wǒ men xū yào zhú bù shí shī zhè gè jì huà.',
        exampleTranslation: 'Бид энэ төлөвлөгөөг үе шаттайгаар хэрэгжүүлэх хэрэгтэй.',
        strokeOrderURL: 'zur1.jpg',
        videoURL: 'https://www.youtube.com/watch?v=xTMUcLe-llI&list=RDxTMUcLe-llI&start_radio=1', // Энд видео холбоосыг оруулах
        understood: true
    },
    { 
        id: 2,
        chinese: '从事',
        pinyin: 'cóng shì',
        mongolian: 'Эрхлэх',
        translation: 'Эрхлэх, хийх, хөтлөх',
        description: 'Энэ үг нь ажил мэргэжил эсвэл үйл ажиллагааг эрхлэх, тодорхой чиглэлээр ажиллаж байгааг илэрхийлнэ. Ихэвчлэн ажил, мэргэжил, бизнес эсвэл тодорхой салбарын үйл ажиллагаанд оролцож байгааг илэрхийлэхэд хэрэглэдэг. Англи хэлээр "to engage in" эсвэл "to be involved in" гэсэн утгатай ойролцоо.',
        example: '他从事教育工作已经二十年了。',
        examplePinyin: 'tā cóng shì jiāo yù gōng zuò yǐ jīng èr shí nián le.',
        exampleTranslation: 'Тэрээр боловсролын салбарт 20 жил ажиллаж байна.',
        strokeOrderURL: 'https://www.strokeorder.info/mandarin.php?q=%E4%BB%8E%E4%BA%8B',
        videoURL: '', // Энд видео холбоосыг оруулах
        understood: true
    },
    { 
        id: 3,
        chinese: '服从',
        pinyin: 'fú cóng',
        mongolian: 'Дагах',
        translation: 'Дагах, дуулгавартай байх',
        description: 'Энэ үг нь заавар, тушаал, хууль дүрэм, зааварчилгааг дагах, биелүүлэх гэсэн утгатай. Энэ нь дуулгавартай байх, захирагдах, хүлээн зөвшөөрч дагах гэсэн утгыг илэрхийлдэг. Англи хэлээр "to obey" эсвэл "to comply with" гэж орчуулна. Цэрэг, ажил байдал эсвэл хууль эрх зүйн хүрээнд түгээмэл хэрэглэгддэг.',
        example: '士兵必须服从命令。',
        examplePinyin: 'shì bīng bì xū fú cóng mìng lìng.',
        exampleTranslation: 'Цэргүүд тушаалыг биелүүлэх ёстой.',
        strokeOrderURL: 'https://www.strokeorder.info/mandarin.php?q=%E6%9C%8D%E4%BB%8E',
        videoURL: '', // Энд видео холбоосыг оруулах
        understood: true
    },
    { 
        id: 4,
        chinese: '胡须',
        pinyin: 'hú xū',
        mongolian: 'Сахал',
        translation: 'Сахал, хөвөн сахал',
        description: 'Энэ үг нь эрэгтэй хүний хацрын болон эрүүний сахал, хөвөн сахлыг хэлнэ. Энэ нь хамгийн энгийн хэлбэрээр "сахал" гэсэн утгатай. Хятад соёлд эртний үед сахал нь эрэгтэй хүний гоо сайхан, эрдэм мэдлэг, насны хувьд ахмад байдлыг илэрхийлдэг байсан.',
        example: '他留着浓密的胡须。',
        examplePinyin: 'tā liú zhe nóng mì de hú xū.',
        exampleTranslation: 'Тэр өтгөн сахалтай.',
        strokeOrderURL: 'https://www.strokeorder.info/mandarin.php?q=%E8%83%A1%E9%A1%BB',
        videoURL: '', // Энд видео холбоосыг оруулах
        understood: true
    },
    { 
        id: 5,
        chinese: '咨询',
        pinyin: 'zī xún',
        mongolian: 'Зөвлөгөө',
        translation: 'Зөвлөгөө авах, асуух',
        description: 'Энэ үг нь мэдээлэл, зөвлөгөө, тусламж хүсэх үйлдлийг илэрхийлнэ. Энэ нь хувь хүн эсвэл байгууллага тодорхой асуудлаар мэргэжлийн зөвлөгөө, тусламж авахыг хүсэж байгааг илэрхийлнэ. Англи хэлээр "to consult" эсвэл "to seek advice" гэж орчуулна. Ихэвчлэн бизнес, хууль эрх зүй, эрүүл мэнд зэрэг салбарт түгээмэл хэрэглэгддэг.',
        example: '您可以咨询我们的客服。',
        examplePinyin: 'nín kě yǐ zī xún wǒ men de kè fú.',
        exampleTranslation: 'Та манай хэрэглэгчийн үйлчилгээнээс лавлаж болно.',
        strokeOrderURL: 'https://www.strokeorder.info/mandarin.php?q=%E5%92%A8%E8%AF%A2',
        videoURL: '', // Энд видео холбоосыг оруулах
        understood: true
    }
];