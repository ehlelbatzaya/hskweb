/**
 * Chinese Flashcards Application
 * Хятад хэлний флашкарт аппликейшн
 */

// DOM-руу хандсаны дараа ажиллах
document.addEventListener('DOMContentLoaded', function() {
    // Үндсэн элементүүд
    const app = document.getElementById('app');
    const videoModal = document.getElementById('videoModal');
    const videoModalTitle = document.getElementById('videoModalTitle');
    const videoContainer = document.getElementById('videoContainer');
    
    // Глобал хувьсагчид
    let currentIndex = 0;
    let words = [...WORDS]; // words.js-ээс импортлогдсон
    let showPinyin = false;
    let showTranslation = false;
    let showExample = false;
    let showDescription = false;
    let showStrokeOrder = false;
    let activeTab = 'chinese';
    let playbackRate = 1.0;
    let searchTerm = '';
    
    // Аппликейшн render хийх функц
    function renderApp() {
        // Нийт үлдсэн үгсийн тоог тооцоолох
        const remainingWords = words.length - currentIndex - 1;
        const notUnderstoodCount = words.filter(word => !word.understood).length;
        const currentWord = words[currentIndex];
        
        // HTML бүтцийг үүсгэх
        app.innerHTML = `
            <!-- HSK levels -->
            <div class="hsk-nav">
                <a href="example.com/hsk1">${LANG.hsk1}</a>
                <a href="example.com/hsk2">${LANG.hsk2}</a>
                <a href="example.com/hsk3">${LANG.hsk3}</a>
                <a href="example.com/hsk4">${LANG.hsk4}</a>
                <a href="example.com/hsk5" class="active">${LANG.hsk5}</a>
                <a href="example.com/hsk6">${LANG.hsk6}</a>
            </div>
            
            <!-- Header -->
            <div class="header">
                <h1>${LANG.appTitle}</h1>
                <p>${LANG.appSubtitle}</p>
            </div>
            
            <!-- Stats & Search -->
            <div class="stats-search">
                <div class="stats">
                    <span>${LANG.totalWords}: ${words.length}</span> | 
                    <span>${LANG.remainingWords}: ${remainingWords}</span> | 
                    <span>${LANG.notUnderstoodWords}: ${notUnderstoodCount}</span>
                </div>
                <div class="search-container">
                    <input type="text" id="searchInput" placeholder="${LANG.searchPlaceholder}" class="search-input">
                    <button id="searchBtn" class="search-btn">${LANG.searchButton}</button>
                    <button id="shuffleBtn" class="action-btn"><i class="fas fa-random"></i></button>
                    <button id="sortBtn" class="action-btn"><i class="fas fa-sort-alpha-down"></i></button>
                </div>
            </div>
            
            <!-- Tabs -->
            <div class="tabs">
                <button id="chineseTab" class="tab ${activeTab === 'chinese' ? 'active' : ''}">${LANG.chineseTab}</button>
                <button id="mongolianTab" class="tab ${activeTab === 'mongolian' ? 'active' : ''}">${LANG.mongolianTab}</button>
            </div>
            
            <!-- Card Area -->
            <div class="card-area">
                <div class="card-content">
                    ${activeTab === 'chinese' ? `
                        <div class="chinese-character">${currentWord.chinese}</div>
                        ${showPinyin ? `<p class="pinyin">${currentWord.pinyin}</p>` : ''}
                        ${showTranslation ? `
                            <div class="translation-box">
                                <p>${currentWord.translation}</p>
                            </div>
                        ` : ''}
                    ` : `
                        <h2 class="mongolian-word">${currentWord.mongolian}</h2>
                        ${showTranslation ? `
                            <div class="translation-box">
                                <p>${currentWord.chinese} (${currentWord.pinyin})</p>
                                <p class="mt-2">${currentWord.translation}</p>
                            </div>
                        ` : ''}
                    `}
                </div>
            </div>
            
            <!-- Sound Button -->
            <div class="sound-btn-container">
                <button id="soundBtn" class="sound-btn">
                    <i class="fas fa-volume-up"></i>
                </button>
            </div>
            
            <!-- Navigation -->
            <div class="navigation">
                <button id="prevBtn" class="nav-btn" ${currentIndex === 0 ? 'disabled' : ''}>
                    <i class="fas fa-chevron-left"></i>
                </button>
                
                <div class="understood-container">
                    <input 
                        type="checkbox" 
                        id="understood" 
                        ${!currentWord.understood ? 'checked' : ''}
                        class="understood-checkbox"
                    >
                    <label for="understood" class="understood-label">${LANG.wordNotUnderstood}</label>
                </div>
                
                <button id="nextBtn" class="nav-btn" ${currentIndex === words.length - 1 ? 'disabled' : ''}>
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
            
            <!-- Action Buttons -->
            <div class="action-buttons">
                <button id="pinyinBtn" class="action-button">
                    <i class="fas fa-edit"></i>
                    ${LANG.pinyinButton}
                </button>
                
                <button id="translationBtn" class="action-button">
                    <i class="fas fa-globe"></i>
                    ${LANG.translationButton}
                </button>
                
                <button id="exampleBtn" class="action-button">
                    <i class="fas fa-comment"></i>
                    ${LANG.exampleButton}
                </button>
                
                <button id="descriptionBtn" class="action-button">
                    <i class="fas fa-edit"></i>
                    ${LANG.descriptionButton}
                </button>
                
                <button id="strokeOrderBtn" class="action-button">
                    <i class="fas fa-edit"></i>
                    ${LANG.strokeOrderButton}
                </button>
            </div>
            
            <!-- Video Button -->
            <button id="videoBtn" class="video-btn">
                <i class="fas fa-video"></i>
                ${LANG.videoButton}
            </button>
            
            <!-- Example Section -->
            ${showExample ? `
                <div class="example-section">
                    <div class="example-header">
                        <h3 class="example-title">${LANG.exampleTitle}</h3>
                        <div class="audio-controls">
                            <button id="playExampleBtn" class="play-example">
                                <i class="fas fa-volume-up"></i>
                            </button>
                            <div>
                                <select id="speed" class="speed-select">
                                    <option value="0.5">0.5x</option>
                                    <option value="0.75">0.75x</option>
                                    <option value="1.0" selected>1.0x</option>
                                    <option value="1.25">1.25x</option>
                                    <option value="1.5">1.5x</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <p class="example-text">${currentWord.example}</p>
                    <p class="example-pinyin">${currentWord.examplePinyin}</p>
                    <p class="example-translation">${currentWord.exampleTranslation}</p>
                </div>
            ` : ''}
            
            <!-- Description Section -->
            ${showDescription ? `
                <div class="description-section">
                    <h3 class="description-title">${LANG.descriptionTitle}</h3>
                    <p class="description-text">${currentWord.description}</p>
                </div>
            ` : ''}
            
            <!-- Stroke Order Section -->
            ${showStrokeOrder ? `
                <div class="stroke-section">
                    <h3 class="stroke-title">${LANG.strokeOrderTitle}</h3>
                    ${currentWord.strokeOrderURL ? `
                        <iframe 
                            src="${currentWord.strokeOrderURL}" 
                            title="Stroke order for ${currentWord.chinese}"
                            class="stroke-iframe">
                        </iframe>
                    ` : `
                        <p>${LANG.strokeOrderNoData}</p>
                    `}
                </div>
            ` : ''}
            
            <!-- Current word not understood info -->
            ${!currentWord.understood ? `
                <div class="not-understood-info">
                    <h3 class="not-understood-title">${LANG.notUnderstoodTitle}</h3>
                    <p><strong>${LANG.chineseLabel}</strong> ${currentWord.chinese} (${currentWord.pinyin})</p>
                    <p><strong>${LANG.mongolianLabel}</strong> ${currentWord.mongolian}</p>
                    <p><strong>${LANG.translationLabel}</strong> ${currentWord.translation}</p>
                </div>
            ` : ''}
            
            <!-- All not understood words -->
            ${notUnderstoodCount > 0 ? `
                <div class="all-not-understood">
                    <h3 class="all-not-understood-title">${LANG.allNotUnderstoodTitle}</h3>
                    ${words.filter(word => !word.understood).map((word, index) => `
                        <div class="not-understood-word">
                            <p><strong>${LANG.chineseLabel}</strong> ${word.chinese} (${word.pinyin})</p>
                            <p><strong>${LANG.mongolianLabel}</strong> ${word.mongolian}</p>
                            <p><strong>${LANG.translationLabel}</strong> ${word.translation}</p>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
        `;
        
        // Event listeners нэмэх
        addEventListeners();
        
        // Select элементийн утгыг тохируулах
        if (showExample) {
            document.getElementById('speed').value = playbackRate;
        }
    }
    
    // Event listeners нэмэх
    function addEventListeners() {
        // Tab товчнууд
        document.getElementById('chineseTab').addEventListener('click', () => {
            activeTab = 'chinese';
            renderApp();
        });
        
        document.getElementById('mongolianTab').addEventListener('click', () => {
            activeTab = 'mongolian';
            renderApp();
        });
        
        // Навигацийн товчнууд
        document.getElementById('prevBtn').addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                showPinyin = false;
                showTranslation = false;
                showExample = false;
                showDescription = false;
                showStrokeOrder = false;
                renderApp();
            }
        });
        
        document.getElementById('nextBtn').addEventListener('click', () => {
            if (currentIndex < words.length - 1) {
                currentIndex++;
                showPinyin = false;
                showTranslation = false;
                showExample = false;
                showDescription = false;
                showStrokeOrder = false;
                renderApp();
            }
        });
        
        // Action товчнууд
        document.getElementById('pinyinBtn').addEventListener('click', () => {
            if (activeTab === 'mongolian') {
                activeTab = 'chinese';
                showPinyin = true;
            } else {
                showPinyin = !showPinyin;
            }
            renderApp();
        });
        
        document.getElementById('translationBtn').addEventListener('click', () => {
            showTranslation = !showTranslation;
            renderApp();
        });
        
        document.getElementById('exampleBtn').addEventListener('click', () => {
            showExample = !showExample;
            renderApp();
        });
        
        document.getElementById('descriptionBtn').addEventListener('click', () => {
            showDescription = !showDescription;
            renderApp();
        });
        
        document.getElementById('strokeOrderBtn').addEventListener('click', () => {
            showStrokeOrder = !showStrokeOrder;
            renderApp();
        });
        
        // Хайх
        document.getElementById('searchBtn').addEventListener('click', handleSearch);
        document.getElementById('searchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
        
        // Холих
        document.getElementById('shuffleBtn').addEventListener('click', () => {
            words = [...words].sort(() => Math.random() - 0.5);
            currentIndex = 0;
            renderApp();
        });
        
        // Эрэмблэх
        document.getElementById('sortBtn').addEventListener('click', () => {
            words = [...words].sort((a, b) => a.pinyin.localeCompare(b.pinyin));
            currentIndex = 0;
            renderApp();
        });
        
        // Ойлгосон эсэх
        document.getElementById('understood').addEventListener('change', (e) => {
            words[currentIndex].understood = !e.target.checked;
            renderApp();
        });
        
        // Аудио тоглуулах
        document.getElementById('soundBtn').addEventListener('click', playPronunciation);
        
        // Видео модал харуулах
        document.getElementById('videoBtn').addEventListener('click', showVideoModal);
        
        // Жишээний аудио
        if (showExample) {
            document.getElementById('playExampleBtn').addEventListener('click', playExampleAudio);
            document.getElementById('speed').addEventListener('change', (e) => {
                playbackRate = e.target.value;
            });
        }
    }
    
    // Хайлт хийх
    function handleSearch() {
        const input = document.getElementById('searchInput');
        const searchTerm = input.value.trim().toLowerCase();
        
        if (searchTerm === '') {
            return;
        }
        
        let foundIndex = -1;
        let isChineseSearch = false;
        
        foundIndex = words.findIndex(word => 
            word.chinese.includes(searchTerm) || 
            word.pinyin.toLowerCase().includes(searchTerm) || 
            word.mongolian.toLowerCase().includes(searchTerm) ||
            word.translation.toLowerCase().includes(searchTerm)
        );
        
        if (foundIndex !== -1) {
            isChineseSearch = words[foundIndex].chinese.includes(searchTerm) || 
                              words[foundIndex].pinyin.toLowerCase().includes(searchTerm);
            
            currentIndex = foundIndex;
            activeTab = isChineseSearch ? 'chinese' : 'mongolian';
            showPinyin = false;
            showTranslation = false;
            showExample = false;
            showDescription = false;
            showStrokeOrder = false;
            input.value = '';
            renderApp();
        } else {
            // Хайлтын алдаа үзүүлэх
            const searchError = document.createElement('div');
            searchError.className = 'search-error';
            searchError.textContent = LANG.searchNotFound.replace('{term}', searchTerm);
            
            // Хуучин алдааны элемент байвал устгах
            const oldError = document.querySelector('.search-error');
            if (oldError) {
                oldError.remove();
            }
            
            // Шинэ алдааны элемент оруулах
            const statsSearch = document.querySelector('.stats-search');
            app.insertBefore(searchError, statsSearch.nextSibling);
            
            // 3 секундын дараа алдааны мессеж алга болгох
            setTimeout(() => {
                const errorToRemove = document.querySelector('.search-error');
                if (errorToRemove) {
                    errorToRemove.remove();
                }
            }, 3000);
        }
    }
    
    // Аудио дуудлага тоглуулах
    function playPronunciation() {
        const currentWord = words[currentIndex];
        
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const speech = new SpeechSynthesisUtterance(currentWord.chinese);
            speech.lang = 'zh-CN';
            speech.rate = parseFloat(playbackRate);
            
            // Хятад дуу авиаг сонгох
            const voices = window.speechSynthesis.getVoices();
            const chineseVoice = voices.find(voice => 
                voice.lang.includes('zh') && voice.name.includes('Google'));
            
            if (chineseVoice) {
                speech.voice = chineseVoice;
            }
            
            window.speechSynthesis.speak(speech);
        } else {
            alert(LANG.audioNotSupported);
        }
    }
    
    // Жишээний аудиог тоглуулах
    function playExampleAudio() {
        const currentWord = words[currentIndex];
        
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const speech = new SpeechSynthesisUtterance(currentWord.example);
            speech.lang = 'zh-CN';
            speech.rate = parseFloat(playbackRate);
            
            // Хятад дуу авиаг сонгох
            const voices = window.speechSynthesis.getVoices();
            const chineseVoice = voices.find(voice => 
                voice.lang.includes('zh') && voice.name.includes('Google'));
            
            if (chineseVoice) {
                speech.voice = chineseVoice;
            }
            
            window.speechSynthesis.speak(speech);
        } else {
            alert(LANG.audioNotSupported);
        }
    }
    
    // Видео модал харуулах
    function showVideoModal() {
        const currentWord = words[currentIndex];
        
        // Модал гарчиг
        videoModalTitle.textContent = LANG.videoTitle.replace('{word}', currentWord.chinese);
        
        // Видео контент
        if (currentWord.videoURL) {
            videoContainer.innerHTML = `
                <video controls class="video-player">
                    <source src="${currentWord.videoURL}" type="video/mp4">
                    ${LANG.audioNotSupported}
                </video>
                <p class="video-note">${LANG.videoNote}</p>
            `;
        } else {
            videoContainer.innerHTML = `
                <p class="no-video-message">${LANG.noVideoMessage}</p>
            `;
        }
        
        // Модал үзүүлэх
        videoModal.style.display = 'block';
        
        // Модал хаах товчлуурт event listener нэмэх
        const closeBtn = videoModal.querySelector('.close');
        closeBtn.addEventListener('click', () => {
            videoModal.style.display = 'none';
            
            // Видео зогсоох
            const video = videoModal.querySelector('video');
            if (video) {
                video.pause();
            }
        });
        
        // Модал гадна талд дарахад хаах
        window.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                videoModal.style.display = 'none';
                
                // Видео зогсоох
                const video = videoModal.querySelector('video');
                if (video) {
                    video.pause();
                }
            }
        });
    }
    
    // Хятад хэл дуудлага хувилбар ачаалах
    function loadVoices() {
        // Chrome дээр заримдаа оройтож ачаалагддаг
        window.speechSynthesis.getVoices();
    }
    
    // Хөтөч дэмжиж байвал дуу авиаг ачаалах
    if ('speechSynthesis' in window) {
        // Chrome-д зориулсан
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
        
        // Бусад хөтөчид зориулсан
        loadVoices();
    }
    
    // Апп эхлүүлэх
    renderApp();
});