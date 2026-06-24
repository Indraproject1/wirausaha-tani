/**
 * WIRAUSAHA TANI - CORE GAME ENGINE
 * Developer: Antigravity AI
 */

// --- 1. CONFIG & GAME BALANCING ---
const CROPS_CONFIG = {
    padi: {
        name: 'Padi',
        seedPrice: 1500,
        sellPrice: 2500,
        growTime: 15, // detik
        xpYield: 15,
        unlockedAt: 1,
        color: '#ffeb3b',
        colorStage1: '#81c784',
        colorStage2: '#c8e6c9',
        colorStage3: '#ffd54f'
    },
    jagung: {
        name: 'Jagung',
        seedPrice: 4500,
        sellPrice: 7500,
        growTime: 25, // detik
        xpYield: 35,
        unlockedAt: 2,
        color: '#ffc107',
        colorStage1: '#a5d6a7',
        colorStage2: '#ffe082',
        colorStage3: '#ffb300'
    },
    tomat: {
        name: 'Tomat',
        seedPrice: 12000,
        sellPrice: 22000,
        growTime: 40, // detik
        xpYield: 80,
        unlockedAt: 3,
        color: '#f44336',
        colorStage1: '#c8e6c9',
        colorStage2: '#ff8a65',
        colorStage3: '#e53935'
    },
    buahnaga: {
        name: 'Buah Naga',
        seedPrice: 35000,
        sellPrice: 70000,
        growTime: 60, // detik
        xpYield: 200,
        unlockedAt: 4,
        color: '#e91e63',
        colorStage1: '#81c784',
        colorStage2: '#f48fb1',
        colorStage3: '#d81b60'
    }
};

// Harga beli petak lahan terkunci
const LOCKED_SOIL_PRICE = 15000;

const LEVEL_XP_REQ = {
    1: 100,
    2: 250,
    3: 500,
    4: 1000 // Max level cap
};

// --- 2. RETRO SVG ICONS IN CODE ---
const SVG_ICONS = {
    padi: `<svg viewBox="0 0 16 16"><path d="M8 2c-1 2-2 4-2 7 0 2.5 1 4 2 5 1-1 2-2.5 2-5 0-3-1-5-2-7z" fill="#ffd54f"/><path d="M8 4c-.5 1.5-1 3-1 5 0 1.5.5 2.5 1 3 .5-.5 1-1.5 1-3 0-2-.5-3.5-1-5z" fill="#ffb300"/></svg>`,
    jagung: `<svg viewBox="0 0 16 16"><rect x="6" y="2" width="4" height="10" rx="2" fill="#ffd54f"/><rect x="5" y="4" width="6" height="4" rx="2" fill="#ffb300"/><path d="M4 12c1-3 1-6 2-8M12 12c-1-3-1-6-2-8" stroke="#4caf50" stroke-width="2" fill="none"/></svg>`,
    tomat: `<svg viewBox="0 0 16 16"><circle cx="8" cy="9" r="5" fill="#f44336"/><ellipse cx="7" cy="7" rx="2" ry="1" fill="#ff8a65"/><path d="M8 2v3M6 3c1 1 3 0 3 0" stroke="#4caf50" stroke-width="2" stroke-linecap="round"/></svg>`,
    buahnaga: `<svg viewBox="0 0 16 16"><path d="M8 2C5 5 4 8 5 12c1 2 4 3 6 1 2-2 2-6 0-9-1-1-2-2-3-2z" fill="#e91e63"/><path d="M8 4c-1 1-2 3-1 5 1 1 2 1 3 0s1-3 0-4c-.5-.5-1-1-2-1z" fill="#f48fb1"/><path d="M6 3l1 2M10 3l-1 2M5 7l2 1M11 7l-2 1" stroke="#4caf50" stroke-width="1.5"/></svg>`,
    seed_bag: `<svg viewBox="0 0 16 16"><path d="M3 5c0-1.5 1-3 3-3h4c2 0 3 1.5 3 3v8H3V5z" fill="#8d6e63"/><path d="M3 5c1 1 3 1 5 1s4 0 5-1V4H3v1z" fill="#795548"/><rect x="5" y="7" width="6" height="4" fill="#a1887f"/><circle cx="8" cy="9" r="2" fill="#4caf50"/></svg>`,
    cangkul: `<svg viewBox="0 0 16 16"><path d="M12 2l2 2-9 9-2-2z" fill="#8d6e63"/><path d="M2 12l2 2-2-2z" fill="#795548"/><path d="M11 2l3 3-2 2-3-3z" fill="#b0bec5"/><path d="M12 1l3 3-1 1-3-3z" fill="#78909c"/></svg>`,
    siram: `<svg viewBox="0 0 16 16"><rect x="3" y="6" width="6" height="7" rx="1" fill="#00bcd4"/><path d="M9 8h4l1 2v1h-5V8z" fill="#00acc1"/><path d="M4 6V3h4v3H4z" fill="#e0f7fa"/><circle cx="13" cy="11" r="1" fill="#fff"/></svg>`,
    well: `<svg viewBox="0 0 16 16"><rect x="2" y="10" width="12" height="5" fill="#9e9e9e"/><rect x="4" y="2" width="8" height="1" fill="#795548"/><path d="M4 3h1v7H4zM11 3h1v7h-1z" fill="#5d4037"/><circle cx="8" cy="4" r="2" fill="#ffb300"/><rect x="7" y="6" width="2" height="4" fill="#cfd8dc"/></svg>`,
    silo: `<svg viewBox="0 0 16 16"><path d="M2 7v7h8V7H2z" fill="#d32f2f"/><path d="M2 7c2-3 6-3 8 0" fill="#b71c1c"/><rect x="4" y="9" width="4" height="5" fill="#3e2723"/><circle cx="12" cy="8" r="3" fill="#78909c"/><rect x="11" y="8" width="2" height="6" fill="#cfd8dc"/></svg>`,
    export: `<svg viewBox="0 0 16 16"><path d="M1 8c0 3.8 3.2 7 7 7s7-3.2 7-7-3.2-7-7-7-7 3.2-7 7z" fill="#0288d1"/><path d="M8 2c-1.5 2-2 4-2 6s.5 4 2 6 2-4 2-6-.5-6-2-6z" fill="#29b6f6"/><path d="M2 8h12M4 5h8M4 11h8" stroke="#fff" stroke-width="1.5" fill="none"/></svg>`
};

// --- 3. AUDIO SYSTEM (WITH SILENT FALLBACK) ---
class AudioManager {
    constructor() {
        this.bgmVolume = 0.5;
        this.sfxVolume = 0.7;
        this.currentBGM = null;
        this.isMuted = false;
    }

    playSFX(name) {
        // Dinonaktifkan karena aset SFX tidak tersedia
    }

    playBGM(name) {
        if (this.currentBGM) {
            this.currentBGM.pause();
        }
        
        // Memakai format .ogg sesuai aset yang disiapkan user
        const audio = new Audio(`assets/audio/${name}.ogg`);
        audio.volume = this.isMuted ? 0 : this.bgmVolume;
        audio.loop = true;
        this.currentBGM = audio;
        
        audio.play().catch(() => {
            console.log(`[Audio BGM] Mengulang ${name} (file tidak ditemukan, abaikan).`);
        });
    }

    setBGMVolume(vol) {
        this.bgmVolume = vol;
        if (this.currentBGM) {
            this.currentBGM.volume = this.isMuted ? 0 : vol;
        }
    }

    setSFXVolume(vol) {
        this.sfxVolume = vol;
    }

    muteAll(mute) {
        this.isMuted = mute;
        if (this.currentBGM) {
            this.currentBGM.volume = mute ? 0 : this.bgmVolume;
        }
    }
}

const audioManager = new AudioManager();

// --- 4. GAME STATE ENGINE ---
class Game {
    constructor() {
        // Parameter Dasar
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Ukuran Canvas Retro (Grid 12 x 8, per tile 64px)
        this.tileSize = 64;
        this.cols = 12;
        this.rows = 8;
        this.canvas.width = this.cols * this.tileSize;
        this.canvas.height = this.rows * this.tileSize;

        // State Inti Game
        this.state = {
            screen: 'loading', // loading, menu, playing
            isPaused: false, // jeda game (freeze)
            cash: 20000, // Rp 20.000 (starting cash)
            story: {
                chapter: 1,       // chapter saat ini (1 atau 2)
                debtPaid: false,  // apakah utang Chapter 1 sudah lunas?
                plotsBought: 0,   // petak lahan yang sudah dibeli
                gameCleared: false // apakah game sudah tamat?
            },
            xp: 0,
            level: 1,
            day: 1,
            dayTimer: 0, // detik
            
            // Inventori item (benih & hasil panen)
            inventory: {
                // Bibit
                'seed_padi': 5,
                'seed_jagung': 0,
                'seed_tomat': 0,
                'seed_buahnaga': 0,
                // Hasil Panen
                'crop_padi': 0,
                'crop_jagung': 0,
                'crop_tomat': 0,
                'crop_buahnaga': 0
            },
            
            // Gudang Silo
            siloCapacity: 15,
            siloUpgrades: 0, // Jumlah berapa kali upgrade

            // Infrastruktur yang dibeli
            hasAutoWell: false,
            hasExportShop: false,

            // Peta Lahan
            grid: []
        };

        // Pemain
        this.player = {
            x: 6, // Grid X
            y: 4, // Grid Y
            direction: 'down', // up, down, left, right
            isMoving: false,
            animFrame: 0,
            animTimer: 0
        };

        // UI States
        this.selectedInventoryItem = null;
        this.selectedGridCell = null; // Petak tanah yang ditunjuk petani

        // Inisialisasi peta grid
        this.initGrid();
        
        // Memuat save game jika ada
        const lastSlot = localStorage.getItem('wirausahaTaniLastSlot');
        this.currentSlot = lastSlot ? parseInt(lastSlot) : 1;
        this.loadGame(this.currentSlot);

        // Inisialisasi HUD & Mute
        this.hudSettings = { type: 'dpad', scale: 1.0, opacity: 0.9, positions: {} };
        this.loadHUDSettings();
        this.initMuteSetting();

        // Image preloader (Aset pixel art premium hasil generate)
        this.images = {};
        this.imagePaths = {
            tileGrass: 'assets/images/tile_grass.png',
            tileSoilDry: 'assets/images/tile_soil_dry.png',
            tileSoilWet: 'assets/images/tile_soil_wet.png',
            tileRiver: 'assets/images/tile_river.png',
            player: 'assets/images/player.png',
            
            // Ikon Benih
            seed_padi: 'assets/images/seed_padi.png',
            seed_jagung: 'assets/images/seed_jagung.png',
            seed_tomat: 'assets/images/seed_tomat.png',
            seed_buahnaga: 'assets/images/seed_buahnaga.png',
            
            // Ikon Hasil Panen
            crop_padi: 'assets/images/crop_padi.png',
            crop_jagung: 'assets/images/crop_jagung.png',
            crop_tomat: 'assets/images/crop_tomat.png',
            crop_buahnaga: 'assets/images/crop_buahnaga.png',
            
            // Ikon Peralatan
            tool_cangkul: 'assets/images/tool_cangkul.png',
            tool_siram: 'assets/images/tool_siram.png',
            
            // Aset Pertumbuhan
            cropSprout: 'assets/images/crop_sprout.png',

            // Aset Bangunan Mandiri
            building_shop: 'assets/images/building_shop.png',
            building_silo: 'assets/images/building_silo.png',
            building_well: 'assets/images/building_well.png',
            building_export: 'assets/images/building_export.png'
        };

        this.loadImages(() => {
            // Konversi Canvas olahan (removeWhiteBackground) menjadi DataURL transparan untuk UI HTML modal
            this.imagesDataURL = {};
            Object.keys(this.images).forEach(key => {
                const imgObj = this.images[key];
                if (imgObj instanceof HTMLCanvasElement) {
                    this.imagesDataURL[key] = imgObj.toDataURL();
                } else {
                    this.imagesDataURL[key] = this.imagePaths[key];
                }
            });

            // Jalankan Event Listeners & Game Loop setelah loading selesai
            this.setupEventListeners();
            this.gameLoop();
            
            // Tampilkan tombol "Masuk Game" di loading screen untuk bypass autoplay restriction browser
            const statusText = document.getElementById('loading-status');
            if (statusText) statusText.innerText = 'Siap Bermain!';
            
            const fill = document.getElementById('loading-bar-fill');
            if (fill) {
                const container = fill.parentElement;
                if (container) container.style.display = 'none'; // Sembunyikan progress bar
            }

            const btnStartLoading = document.getElementById('btn-start-game-loading');
            if (btnStartLoading) {
                btnStartLoading.classList.remove('hidden');
                btnStartLoading.addEventListener('click', () => {
                    // Putar BGM menu utama secara instan karena ada di dalam gesture click
                    audioManager.playBGM('bgm_menu');
                    
                    const loading = document.getElementById('loading-screen');
                    if (loading) {
                        loading.style.display = 'none';
                        loading.classList.remove('active');
                    }
                    const mainMenu = document.getElementById('main-menu-screen');
                    if (mainMenu) mainMenu.style.display = 'flex';
                });
            } else {
                // Fallback jika tombol tidak ditemukan di HTML
                setTimeout(() => {
                    const loading = document.getElementById('loading-screen');
                    if (loading) {
                        loading.style.display = 'none';
                        loading.classList.remove('active');
                    }
                    const mainMenu = document.getElementById('main-menu-screen');
                    if (mainMenu) mainMenu.style.display = 'flex';
                }, 500);
            }
        });

    }

    initGrid() {
        this.state.grid = [];
        for (let r = 0; r < this.rows; r++) {
            const rowData = [];
            for (let c = 0; c < this.cols; c++) {
                let type = 'grass';
                
                // Menentukan objek statis di peta
                if (r === 0 || r === 7 || c === 0 || c === 11) {
                    type = 'fence'; // Pembatas luar
                } else if (c === 1 && r === 1) {
                    type = 'silo'; // Gudang Silo di kiri atas
                } else if (c === 10 && r === 1) {
                    type = 'export'; // Toko ekspor di kanan atas
                } else if (c === 10 && r === 5) {
                    type = 'well'; // Sumur di kanan bawah
                } else if (c === 1 && r === 5) {
                    type = 'shop'; // Toko desa di kiri bawah
                } else if (c === 3 && r === 1) {
                    type = 'npc'; // NPC Pak Karsa - pemberi quest utama
                } else if (c >= 8 && c <= 9 && r >= 2 && r <= 4) {
                    type = 'river'; // Sungai hiasan di kanan
                } else if (c >= 4 && c <= 7 && r >= 3 && r <= 5) {
                    // Area lahan pertanian inti (terbuka sejak awal)
                    type = 'soil';
                } else if (
                    // Petak tanah terkunci di sekeliling area tani - bisa dibeli
                    (c === 3 && r >= 3 && r <= 5) ||  // kolom kiri area tani
                    (c === 3 && r === 6) ||
                    (c >= 4 && c <= 7 && r === 6) ||  // baris bawah area tani
                    (c >= 4 && c <= 7 && r === 2) ||  // baris atas area tani
                    (c === 7 && r >= 2 && r <= 6)     // kolom kanan area tani (ekstra)
                ) {
                    type = 'locked_soil'; // Lahan terkunci, bisa dibeli Rp 15.000
                }

                rowData.push({
                    x: c,
                    y: r,
                    type: type,
                    soilState: 'grass', // grass, plowed, watered
                    crop: null // menyimpan detail tanaman jika ditanam
                });
            }
            this.state.grid.push(rowData);
        }

        // Pasang entitas Chapter 2 jika sudah di Chapter 2
        if (this.state.story && this.state.story.chapter === 2) {
            this.setupChapter2GridEntities();
        }
    }

    setupChapter2GridEntities() {
        // Tempatkan rumah di c: 5, r: 1
        if (this.state.grid[1] && this.state.grid[1][5]) {
            this.state.grid[1][5].type = 'house';
        }
        // Tempatkan Ayah di c: 4, r: 1
        if (this.state.grid[1] && this.state.grid[1][4]) {
            this.state.grid[1][4].type = 'npc_ayah';
        }
        // Tempatkan Ibu di c: 6, r: 1
        if (this.state.grid[1] && this.state.grid[1][6]) {
            this.state.grid[1][6].type = 'npc_ibu';
        }
    }

    // Filter untuk membersihkan background putih kasar pada aset gambar hasil generate
    removeWhiteBackground(img) {
        try {
            const tempCanvas = document.createElement('canvas');
            const w = img.naturalWidth || img.width || 64;
            const h = img.naturalHeight || img.height || 64;
            tempCanvas.width = w;
            tempCanvas.height = h;
            const ctx = tempCanvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            
            const imgData = ctx.getImageData(0, 0, w, h);
            const data = imgData.data;
            
            // Loop per pixel untuk mengubah pixel putih/hampir putih menjadi transparan
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i+1];
                const b = data[i+2];
                // Jika r, g, b sangat dekat ke putih (semuanya di atas 228)
                if (r > 228 && g > 228 && b > 228) {
                    data[i+3] = 0; // Set Alpha = 0 (Transparan penuh)
                }
            }
            
            ctx.putImageData(imgData, 0, 0);
            return tempCanvas;
        } catch (e) {
            console.warn("[removeWhiteBackground] Gagal mengolah transparansi piksel:", e);
            return img; // Kembalikan gambar asli jika terjadi isu CORS lokal
        }
    }

    // Sistem Preloader Gambar
    loadImages(callback) {
        const keys = Object.keys(this.imagePaths);
        let loadedCount = 0;
        const total = keys.length;
        
        if (total === 0) {
            callback();
            return;
        }

        keys.forEach(key => {
            const img = new Image();
            // Mencegah masalah CORS saat mengakses piksel gambar lokal di Canvas
            img.crossOrigin = "anonymous"; 
            img.src = this.imagePaths[key];
            img.onload = () => {
                loadedCount++;
                // Bersihkan background putih otomatis
                this.images[key] = this.removeWhiteBackground(img);
                
                // Update progres loading bar di UI
                const percent = Math.round((loadedCount / total) * 100);
                const fill = document.getElementById('loading-bar-fill');
                const status = document.getElementById('loading-status');
                if (fill) fill.style.width = `${percent}%`;
                if (status) status.innerText = `Memuat aset gambar... ${percent}%`;

                if (loadedCount === total) {
                    callback();
                }
            };
            img.onerror = () => {
                console.error(`Gagal memuat gambar: ${this.imagePaths[key]}. Menggunakan fallback visual.`);
                loadedCount++;
                
                if (loadedCount === total) {
                    callback();
                }
            };
        });
    }


    // --- 5. PROGRESSION & SYSTEM CORE ---
    addXP(amount) {
        if (this.state.level >= 4) {
            this.state.xp += amount;
            this.updateHUD();
            this.saveGame();
            return;
        }

        this.state.xp += amount;
        const req = LEVEL_XP_REQ[this.state.level];
        if (this.state.xp >= req) {
            this.state.xp -= req;
            this.state.level++;
            audioManager.playSFX('sfx_levelup');
            this.showNotification(`🎉 LEVEL UP! Sekarang Anda Level ${this.state.level}!`);
            
            // Unlock notifications
            if (this.state.level === 2) {
                this.showNotification(`🌽 Unlock: Jagung & Lumbung Silo!`);
            } else if (this.state.level === 3) {
                this.showNotification(`🍅 Unlock: Tomat & Sumur Otomatis!`);
            } else if (this.state.level === 4) {
                this.showNotification(`🐉 Unlock: Buah Naga & Toko Ekspor!`);
            }
        }
        this.updateHUD();
        this.saveGame();
    }

    updateHUD() {
        document.getElementById('hud-cash-val').innerText = `Rp ${this.formatNumber(this.state.cash)}`;
        document.getElementById('hud-day-val').innerText = `Hari Ke: ${this.state.day}`;
        document.getElementById('hud-lvl-badge').innerText = `Lvl ${this.state.level}`;

        const req = LEVEL_XP_REQ[this.state.level] || 1000;
        const progressPercent = Math.min((this.state.xp / req) * 100, 100);
        document.getElementById('hud-xp-fill').style.width = `${progressPercent}%`;
        document.getElementById('hud-xp-text').innerText = `${this.state.xp}/${req} XP`;
        
        this.updateChapterInfoHUD();
    }

    formatNumber(num) {
        return new Intl.NumberFormat('id-ID').format(num);
    }

    showNotification(msg) {
        const area = document.getElementById('notification-area');
        const bubble = document.createElement('div');
        bubble.className = 'notif-bubble';
        bubble.innerText = msg;
        area.appendChild(bubble);

        // Hapus gelembung setelah animasi selesai (3 detik)
        setTimeout(() => {
            bubble.remove();
        }, 3000);
    }

    // --- 6. SAVE & LOAD LOCALSTORAGE ---
    saveGame(slot = this.currentSlot || 1) {
        this.currentSlot = slot;
        try {
            const gridToSave = this.state.grid.map(row =>
                row.map(cell => ({
                    type: cell.type,
                    soilState: cell.soilState,
                    crop: cell.crop ? { ...cell.crop } : null
                }))
            );
            const saveData = {
                cash: this.state.cash,
                xp: this.state.xp,
                level: this.state.level,
                day: this.state.day,
                dayTimer: this.state.dayTimer,
                inventory: { ...this.state.inventory },
                siloCapacity: this.state.siloCapacity,
                siloUpgrades: this.state.siloUpgrades,
                hasAutoWell: this.state.hasAutoWell,
                hasExportShop: this.state.hasExportShop,
                story: { ...this.state.story },
                grid: gridToSave,
                playerX: this.player.x,
                playerY: this.player.y,
                playerDir: this.player.direction,
                saveTime: Date.now()
            };
            localStorage.setItem(`wirausahaTaniSave_slot${slot}`, JSON.stringify(saveData));
            localStorage.setItem('wirausahaTaniLastSlot', slot);
        } catch (e) {
            console.warn('[SaveGame] Gagal menyimpan ke slot ' + slot, e);
        }
    }

    loadGame(slot = this.currentSlot || 1) {
        this.currentSlot = slot;
        localStorage.removeItem('wirausaha_tani_save');
        try {
            const raw = localStorage.getItem(`wirausahaTaniSave_slot${slot}`);
            if (!raw) return false;
            // Bersihkan grid ke state awal sebelum memuat save
            this.initGrid();
            const save = JSON.parse(raw);

            this.state.cash = save.cash ?? this.state.cash;
            this.state.xp = save.xp ?? 0;
            this.state.level = save.level ?? 1;
            this.state.day = save.day ?? 1;
            this.state.dayTimer = save.dayTimer ?? 0;
            this.state.inventory = save.inventory ?? this.state.inventory;
            this.state.siloCapacity = save.siloCapacity ?? 20;
            this.state.siloUpgrades = save.siloUpgrades ?? 0;
            this.state.hasAutoWell = save.hasAutoWell ?? false;
            this.state.hasExportShop = save.hasExportShop ?? false;
            this.state.story = save.story ?? { chapter: 1, debtPaid: false, plotsBought: 0, gameCleared: false };

            if (save.grid && save.grid.length === this.rows) {
                for (let r = 0; r < this.rows; r++) {
                    for (let c = 0; c < this.cols; c++) {
                        const saved = save.grid[r][c];
                        if (saved) {
                            // Restore tipe tile (termasuk locked_soil yang sudah dibeli)
                            if (saved.type === 'soil' && this.state.grid[r][c].type === 'locked_soil') {
                                this.state.grid[r][c].type = 'soil';
                            }
                            this.state.grid[r][c].soilState = saved.soilState ?? 'grass';
                            this.state.grid[r][c].crop = saved.crop ?? null;
                        }
                    }
                }
            }

            // Pasang entitas Chapter 2 jika di Chapter 2
            if (this.state.story.chapter === 2) {
                this.setupChapter2GridEntities();
            }

            if (save.playerX !== undefined) this.player.x = save.playerX;
            if (save.playerY !== undefined) this.player.y = save.playerY;
            if (save.playerDir) this.player.direction = save.playerDir;

            console.log('[LoadGame] Berhasil memuat save Slot ' + slot + ' - Hari ke-' + this.state.day);
            return true;
        } catch (e) {
            console.warn('[LoadGame] Format save rusak atau gagal di-load:', e);
            localStorage.removeItem(`wirausahaTaniSave_slot${slot}`);
            return false;
        }
    }

    resetSave(slot = this.currentSlot || 1) {
        this.currentSlot = slot;
        localStorage.removeItem(`wirausahaTaniSave_slot${slot}`);
        localStorage.removeItem('wirausaha_tani_save');
        this.state.cash = 20000;
        this.state.xp = 0;
        this.state.level = 1;
        this.state.day = 1;
        this.state.dayTimer = 0;
        this.state.inventory = {
            'seed_padi': 5, 'seed_jagung': 0, 'seed_tomat': 0, 'seed_buahnaga': 0,
            'crop_padi': 0, 'crop_jagung': 0, 'crop_tomat': 0, 'crop_buahnaga': 0
        };
        this.state.siloCapacity = 20;
        this.state.siloUpgrades = 0;
        this.state.hasAutoWell = false;
        this.state.hasExportShop = false;
        this.state.story = { chapter: 1, debtPaid: false, plotsBought: 0, gameCleared: false };
        this.initGrid();
        this.updateHUD();
        this.updateChapterInfoHUD();
        this.saveGame(slot);
        this.showNotification("🔄 Data slot " + slot + " berhasil direset!");
    }



    // --- 7. INPUT & MOVEMENT LOGIC ---
    setupEventListeners() {
        // D-Pad Touch/Mouse Controls
        this.bindDpadButton('dpad-up', 'up');
        this.bindDpadButton('dpad-down', 'down');
        this.bindDpadButton('dpad-left', 'left');
        this.bindDpadButton('dpad-right', 'right');

        // Keyboard Fallback (untuk pengujian di laptop)
        window.addEventListener('keydown', (e) => {
            if (this.state.screen !== 'playing') return;
            let dir = null;
            if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'w') dir = 'up';
            if (e.key === 'ArrowDown' || e.key.toLowerCase() === 's') dir = 'down';
            if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') dir = 'left';
            if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') dir = 'right';
            
            if (dir) {
                e.preventDefault();
                this.movePlayer(dir);
            }

            if (e.key.toLowerCase() === 'j') { // Key J = A Action
                this.executeActionA();
            }
            if (e.key.toLowerCase() === 'k') { // Key K = B Action
                this.executeActionB();
            }
        });

        // Action Buttons Click
        document.getElementById('btn-action-a').addEventListener('click', () => {
            if (this.state.screen === 'playing') this.executeActionA();
        });
        document.getElementById('btn-action-b').addEventListener('click', () => {
            if (this.state.screen === 'playing') this.executeActionB();
        });

        // UI Navigation (Menu & Popups)
        document.getElementById('btn-start').addEventListener('click', () => {
            audioManager.playSFX('sfx_click');
            this.openSlotsModal('new_game');
        });

        document.getElementById('btn-load-menu').addEventListener('click', () => {
            audioManager.playSFX('sfx_click');
            this.openSlotsModal('load');
        });

        document.getElementById('btn-close-slots').addEventListener('click', () => {
            audioManager.playSFX('sfx_click');
            document.getElementById('slots-screen').classList.add('hidden');
        });

        for (let i = 1; i <= 3; i++) {
            document.getElementById(`slot-card-${i}`).addEventListener('click', () => {
                audioManager.playSFX('sfx_click');
                this.handleSlotClick(i);
            });
        }

        document.getElementById('btn-settings').addEventListener('click', () => {
            audioManager.playSFX('sfx_click');
            // Sinkronisasi status checkbox BGM (aktif jika tidak dimute)
            const checkMute = document.getElementById('check-mute');
            if (checkMute) {
                checkMute.checked = !audioManager.isMuted;
            }
            document.getElementById('settings-screen').classList.remove('hidden');
        });

        document.getElementById('btn-close-settings').addEventListener('click', () => {
            audioManager.playSFX('sfx_click');
            document.getElementById('settings-screen').classList.add('hidden');
        });

        // Event listener untuk checkbox musik BGM
        const checkMute = document.getElementById('check-mute');
        if (checkMute) {
            checkMute.addEventListener('change', (e) => {
                const enabled = e.target.checked;
                const muted = !enabled;
                audioManager.muteAll(muted);
                localStorage.setItem('wirausahaTaniMute', muted);
                this.showNotification(enabled ? '🔊 Musik diaktifkan' : '🔇 Musik dimatikan');
            });
        }

        document.getElementById('btn-credits').addEventListener('click', () => {
            audioManager.playSFX('sfx_click');
            document.getElementById('credits-screen').classList.remove('hidden');
        });

        document.getElementById('btn-close-credits').addEventListener('click', () => {
            audioManager.playSFX('sfx_click');
            document.getElementById('credits-screen').classList.add('hidden');
        });

        // Tombol reset data game (nullable karena hanya ada di menu settings, tidak selalu di DOM)
        const btnResetSave = document.getElementById('btn-reset-save');
        if (btnResetSave) {
            btnResetSave.addEventListener('click', () => {
                if (confirm("Apakah Anda yakin ingin menghapus semua progres pertanian Anda?")) {
                    audioManager.playSFX('sfx_click');
                    this.resetSave(this.currentSlot);
                    document.getElementById('settings-screen').classList.add('hidden');
                }
            });
        }


        // =============================================
        // FLOATING CHEAT PANEL (Gem Button)
        // =============================================
        this._cheatUnlocked = false; // Sandi hanya diminta sekali per sesi

        const CHEAT_PASSWORDS = ['PETANIKAYA', 'TANIJAYA', 'DEVMODE'];

        const openCheatPanel = () => {
            // Update tampilan kas di panel
            const cashDisplay = document.getElementById('cheat-cash-display');
            if (cashDisplay) cashDisplay.innerText = `Rp ${this.formatNumber(this.state.cash)}`;
            document.getElementById('modal-cheat').classList.remove('hidden');
            this.state.isPaused = true;
        };

        document.getElementById('btn-cheat-hud').addEventListener('click', () => {
            if (this.state.screen !== 'playing') return;
            audioManager.playSFX('sfx_click');

            if (!this._cheatUnlocked) {
                // Minta sandi — hanya sekali selama sesi ini
                const code = prompt('🔐 Masukkan Kode Sandi Dev:');
                if (!code) return;
                if (CHEAT_PASSWORDS.includes(code.trim().toUpperCase())) {
                    this._cheatUnlocked = true;
                    audioManager.playSFX('sfx_levelup');
                    this.showNotification('💎 Dev Panel terbuka! Pilih nominal yang ingin ditambahkan.');
                    openCheatPanel();
                } else {
                    this.showNotification('❌ Kode sandi salah!');
                }
            } else {
                openCheatPanel();
            }
        });

        // Tombol tutup cheat panel
        document.getElementById('btn-close-cheat').addEventListener('click', () => {
            audioManager.playSFX('sfx_click');
            document.getElementById('modal-cheat').classList.add('hidden');
            this.state.isPaused = false;
        });

        // Tombol pilih nominal cheat
        document.querySelectorAll('.cheat-amount-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const amount = parseInt(btn.dataset.amount, 10);
                if (!amount || isNaN(amount)) return;
                audioManager.playSFX('sfx_levelup');
                this.state.cash += amount;
                this.updateHUD();
                this.saveGame();
                // Update tampilan kas di panel langsung
                const cashDisplay = document.getElementById('cheat-cash-display');
                if (cashDisplay) cashDisplay.innerText = `Rp ${this.formatNumber(this.state.cash)}`;
                this.showNotification(`💎 CHEAT: +Rp ${this.formatNumber(amount)} berhasil ditambahkan!`);
            });
        });

        document.getElementById('btn-exit').addEventListener('click', () => {
            audioManager.playSFX('sfx_click');
            if (confirm("Kembali ke layar utama?")) {
                location.reload();
            }
        });


        // --- IN-GAME PAUSE MENU LOGIC ---
        // Tombol ☰ MENU di HUD Top
        document.getElementById('btn-hud-menu').addEventListener('click', () => {
            audioManager.playSFX('sfx_click');
            this.state.isPaused = true;
            document.getElementById('pause-menu-overlay').classList.remove('hidden');
        });

        // Tombol ❓ PANDUAN di HUD Top
        document.getElementById('btn-hud-guide').addEventListener('click', () => {
            audioManager.playSFX('sfx_click');
            this.state.isPaused = true;
            document.getElementById('guide-screen').classList.remove('popup-hidden');
        });

        // Tombol Tutup Panduan (X)
        document.getElementById('btn-close-guide').addEventListener('click', () => {
            audioManager.playSFX('sfx_click');
            // Unpause game jika menu pause utama tidak terbuka
            if (this.state.screen === 'playing' && document.getElementById('pause-menu-overlay').classList.contains('hidden')) {
                this.state.isPaused = false;
            }
            document.getElementById('guide-screen').classList.add('popup-hidden');
        });

        // Logika Perpindahan Tab Panduan
        const tabControls = document.getElementById('tab-controls');
        const tabGameplay = document.getElementById('tab-gameplay');
        const contentControls = document.getElementById('guide-controls-content');
        const contentGameplay = document.getElementById('guide-gameplay-content');

        tabControls.addEventListener('click', () => {
            audioManager.playSFX('sfx_click');
            tabControls.classList.add('active-tab');
            tabGameplay.classList.remove('active-tab');
            contentControls.classList.remove('hidden');
            contentGameplay.classList.add('hidden');
        });

        tabGameplay.addEventListener('click', () => {
            audioManager.playSFX('sfx_click');
            tabGameplay.classList.add('active-tab');
            tabControls.classList.remove('active-tab');
            contentGameplay.classList.remove('hidden');
            contentControls.classList.add('hidden');
        });

        // Tombol Tutup Menu (X)
        document.getElementById('btn-close-pause-menu').addEventListener('click', () => {
            audioManager.playSFX('sfx_click');
            this.state.isPaused = false;
            document.getElementById('pause-menu-overlay').classList.add('hidden');
        });

        // Tombol LANJUTKAN
        document.getElementById('btn-pause-continue').addEventListener('click', () => {
            audioManager.playSFX('sfx_click');
            this.state.isPaused = false;
            document.getElementById('pause-menu-overlay').classList.add('hidden');
        });

        // Tombol SIMPAN DATA (SAVE MANUAL)
        document.getElementById('btn-pause-save').addEventListener('click', () => {
            audioManager.playSFX('sfx_click');
            this.openSlotsModal('save');
        });



        // Tombol PENGATURAN (dari pause menu) — membuka settings-screen
        document.getElementById('btn-pause-settings').addEventListener('click', () => {
            audioManager.playSFX('sfx_click');
            // Sinkronisasi status checkbox BGM (centang = aktif = tidak dimute)
            const checkMute = document.getElementById('check-mute');
            if (checkMute) {
                checkMute.checked = !audioManager.isMuted;
            }
            document.getElementById('pause-menu-overlay').classList.add('hidden');
            document.getElementById('settings-screen').classList.remove('hidden');
        });

        // Tombol EDIT HUD di settings-screen
        document.getElementById('btn-settings-edit-hud').addEventListener('click', () => {
            audioManager.playSFX('sfx_click');
            
            // Tentukan apakah kita sedang di main menu atau in-game
            const isPlaying = (this.state && this.state.screen === 'playing');
            this.isEditingHUDFromMainMenu = !isPlaying;

            document.getElementById('settings-screen').classList.add('hidden');
            document.getElementById('pause-menu-overlay').classList.add('hidden');

            if (this.isEditingHUDFromMainMenu) {
                // Sembunyikan main menu overlay
                const mainMenu = document.getElementById('main-menu-screen');
                if (mainMenu) mainMenu.style.display = 'none';

                // Tampilkan game-screen overlay (berisi virtual controls dan editor bar)
                const gameScreen = document.getElementById('game-screen');
                if (gameScreen) {
                    gameScreen.style.display = 'block';
                    gameScreen.style.backgroundColor = '#1a1c23'; // Gelap retro agar terlihat kontras
                }

                // Sembunyikan elemen in-game yang tidak perlu saat di menu utama
                const canvasContainer = document.getElementById('canvas-container');
                if (canvasContainer) canvasContainer.style.visibility = 'hidden';
                const hudTop = document.getElementById('hud-top');
                if (hudTop) hudTop.style.visibility = 'hidden';
            }

            this.startEditHUD();
        });

        // Tombol KELUAR KE MENU UTAMA
        document.getElementById('btn-pause-exit').addEventListener('click', () => {
            audioManager.playSFX('sfx_click');
            if (confirm("Simpan progress dan kembali ke Menu Awal?")) {
                this.saveGame();
                location.reload(); // Segarkan halaman untuk me-reset state browser bersih ke menu utama
            }
        });
        // Volume sliders dihapus dari settings; hanya checkbox BGM yang digunakan

        // Modal Close Buttons
        document.getElementById('btn-close-toko').addEventListener('click', () => {
            audioManager.playSFX('sfx_click');
            this.closeModal('modal-toko');
        });
        document.getElementById('btn-close-tas').addEventListener('click', () => {
            audioManager.playSFX('sfx_click');
            this.closeModal('modal-tas');
        });
        document.getElementById('btn-close-pasar').addEventListener('click', () => {
            audioManager.playSFX('sfx_click');
            this.closeModal('modal-pasar');
        });

        // Button Jual Semua Hasil Panen
        document.getElementById('btn-jual-semua').addEventListener('click', () => {
            this.sellAllCrops();
        });

        // Inisialisasi event-listener untuk editor HUD dan joystick analog
        this.setupHUDDragAndDrop();
        this.setupHUDEditorListeners();
        this.setupAnalogJoystick();
    }

    bindDpadButton(id, dir) {
        const btn = document.getElementById(id);
        
        const startMove = (e) => {
            e.preventDefault();
            if (this.state.screen !== 'playing') return;
            this.movePlayer(dir);
            // Autorepeat pergerakan selama ditekan
            this.dpadInterval = setInterval(() => {
                this.movePlayer(dir);
            }, 200);
        };

        const stopMove = (e) => {
            e.preventDefault();
            clearInterval(this.dpadInterval);
        };

        btn.addEventListener('mousedown', startMove);
        btn.addEventListener('mouseup', stopMove);
        btn.addEventListener('mouseleave', stopMove);

        btn.addEventListener('touchstart', startMove);
        btn.addEventListener('touchend', stopMove);
    }

    movePlayer(dir) {
        if (this.player.isMoving) return;

        this.player.direction = dir;
        let nextX = this.player.x;
        let nextY = this.player.y;

        if (dir === 'up') nextY--;
        if (dir === 'down') nextY++;
        if (dir === 'left') nextX--;
        if (dir === 'right') nextX++;

        // Cek Batasan Map & Kolisi Rintangan
        if (nextX >= 0 && nextX < this.cols && nextY >= 0 && nextY < this.rows) {
            const nextTile = this.state.grid[nextY][nextX];
            
            // Daftar petak yang tidak bisa dilewati secara fisik
            const obstacles = ['fence', 'river', 'silo', 'well', 'export', 'shop', 'npc', 'house', 'npc_ayah', 'npc_ibu'];
            if (!obstacles.includes(nextTile.type)) {
                // Jalankan Animasi perpindahan grid
                this.player.isMoving = true;
                this.player.moveStartTime = Date.now();
                this.player.x = nextX;
                this.player.y = nextY;
                
                setTimeout(() => {
                    this.player.isMoving = false;
                }, 150); // Waktu transisi langkah petani

            }
        }

        this.updateSelectedCell();
    }

    // Mengambil petak tanah di depan pemain untuk interaksi
    updateSelectedCell() {
        let fx = this.player.x;
        let fy = this.player.y;

        if (this.player.direction === 'up') fy--;
        if (this.player.direction === 'down') fy++;
        if (this.player.direction === 'left') fx--;
        if (this.player.direction === 'right') fx++;

        if (fx >= 0 && fx < this.cols && fy >= 0 && fy < this.rows) {
            this.selectedGridCell = this.state.grid[fy][fx];
            // Simpan koordinat grid agar addActionFeedback bisa menggunakannya
            this.selectedGridCell.x = fx;
            this.selectedGridCell.y = fy;
            this.selectedCellCoord = { x: fx, y: fy };
        } else {
            this.selectedGridCell = null;
            this.selectedCellCoord = null;
        }

        this.updateActionButtonsLabel();
    }


    updateActionButtonsLabel() {
        const labelA = document.getElementById('label-action-a');
        const labelB = document.getElementById('label-action-b');

        if (!this.selectedGridCell) {
            labelA.innerText = "Cangkul";
            labelB.innerText = "Menu";
            return;
        }

        const cell = this.selectedGridCell;

        // Penyesuaian label tombol berdasarkan target petak di depan pemain
        if (cell.type === 'soil') {
            if (cell.soilState === 'grass') {
                labelA.innerText = "Cangkul";
                labelB.innerText = "---";
            } else if (cell.soilState === 'plowed') {
                labelA.innerText = "Siram";
                labelB.innerText = "Tanam";
            } else if (cell.soilState === 'watered') {
                if (cell.crop) {
                    if (cell.crop.progress >= 1) {
                        labelA.innerText = "Siram";
                        labelB.innerText = "Panen";
                    } else {
                        labelA.innerText = "Siram";
                        labelB.innerText = "Info";
                    }
                } else {
                    labelA.innerText = "Siram";
                    labelB.innerText = "Tanam";
                }
            }
        } else if (cell.type === 'npc' || cell.type === 'npc_ayah' || cell.type === 'npc_ibu') {
            labelA.innerText = "---";
            labelB.innerText = "💬 Bicara";
        } else if (cell.type === 'locked_soil') {
            labelA.innerText = "---";
            labelB.innerText = `🔒 Beli (Rp ${this.formatNumber(LOCKED_SOIL_PRICE)})`;
        } else if (cell.type === 'shop') {
            labelA.innerText = "---";
            labelB.innerText = "Buka Toko";
        } else if (cell.type === 'silo') {
            labelA.innerText = "---";
            labelB.innerText = "Buka Silo";
        } else if (cell.type === 'well') {
            labelA.innerText = "---";
            labelB.innerText = "Sumur";
        } else if (cell.type === 'export') {
            labelA.innerText = "---";
            labelB.innerText = "Buka Ekspor";
        } else {
            labelA.innerText = "Cangkul";
            labelB.innerText = "Menu";
        }
    }

    // --- 8. ACTION EXECUTIONS (A & B BUTTONS) ---
    executeActionA() {
        if (!this.selectedGridCell) return;
        const cell = this.selectedGridCell;

        if (cell.type === 'soil') {
            // Aksi CANGKUL (Ubah Rumput jadi Lahan Siap Tanam)
            if (cell.soilState === 'grass') {
                audioManager.playSFX('sfx_till');
                cell.soilState = 'plowed';
                this.addActionFeedback(cell.x, cell.y, '⛏️', 900);
                this.showNotification("⛏️ Tanah telah dicangkul, siap ditanami!");
                this.addXP(2);
            } 
            // Aksi SIRAM (Ubah Lahan Plowed jadi Basah)
            else if (cell.soilState === 'plowed' || cell.soilState === 'watered') {
                audioManager.playSFX('sfx_water');
                cell.soilState = 'watered';
                if (cell.crop) {
                    cell.crop.watered = true;
                    this.addActionFeedback(cell.x, cell.y, '💧', 800);
                    this.showNotification("💧 Tanaman disiram! Pertumbuhan berjalan.");
                } else {
                    this.addActionFeedback(cell.x, cell.y, '💧', 800);
                    this.showNotification("💧 Tanah disiram air.");
                }
            }
        }

        this.updateSelectedCell();
        this.saveGame();
    }

    executeActionB() {
        // Jika tidak menghadap objek interaktif apa pun, buka tas biasa
        if (!this.selectedGridCell) {
            this.openInventoryModal();
            return;
        }

        const cell = this.selectedGridCell;

        if (cell.type === 'npc' || cell.type === 'npc_ayah' || cell.type === 'npc_ibu') {
            this.talkToNPC(cell.type);
        } else if (cell.type === 'locked_soil') {
            this.buySoilPlot(cell);
        } else if (cell.type === 'soil') {
            // TANAM BIBIT (Jika lahan kosong dan siap)
            if (!cell.crop && (cell.soilState === 'plowed' || cell.soilState === 'watered')) {
                this.openInventoryModal(true); // Buka tas dalam mode menanam
            }
            // PANEN (Jika tanaman sudah matang)
            else if (cell.crop && cell.crop.progress >= 1) {
                this.harvestCrop(cell);
            }
            // INFO TANAMAN
            else if (cell.crop) {
                const sisaDetik = Math.ceil(cell.crop.totalTime * (1 - cell.crop.progress));
                this.showNotification(`🌱 ${CROPS_CONFIG[cell.crop.type].name}: Tumbuh ${Math.round(cell.crop.progress * 100)}% (Sisa ${sisaDetik} detik)`);
            }
        } else if (cell.type === 'shop') {
            this.openShopModal();
        } else if (cell.type === 'silo') {
            this.openPasarModal(false);
        } else if (cell.type === 'export') {
            if (this.state.level < 4) {
                this.showNotification("🔒 Toko Ekspor baru terbuka di Level 4!");
            } else if (!this.state.hasExportShop) {
                this.openBuildingBuildOverlay('export');
            } else {
                this.openPasarModal(true);
            }
        } else if (cell.type === 'well') {
            if (this.state.level < 3) {
                this.showNotification("🔒 Sumur Otomatis baru terbuka di Level 3!");
            } else if (!this.state.hasAutoWell) {
                this.openBuildingBuildOverlay('well');
            } else {
                this.showNotification("💧 Sumur Otomatis aktif! Durasi tumbuh tanaman lebih cepat 20%.");
            }
        } else {
            this.openInventoryModal();
        }

        this.updateSelectedCell();
        this.saveGame();
    }

    // ============================================================
    // --- 8b. STORY MODE: NPC DIALOG & CHAPTER SYSTEM ---
    // ============================================================

    talkToNPC(npcType = 'npc') {
        const ch = this.state.story.chapter;

        // Dialog khusus Ayah (Chapter 2)
        if (npcType === 'npc_ayah') {
            this.showDialog([
                {
                    name: "Ayah",
                    text: "Nak... Ayah benar-benar tidak menyangka kita sekeluarga akhirnya bisa pindah dan tinggal di kota Agropolitan ini.",
                    next: 1
                },
                {
                    name: "Ayah",
                    text: "Semua ini berkat kerja kerasmu yang luar biasa dalam melunasi hutang sewa lahan kita Rp 50.000 kepada Pak Karsa di desa kemarin.",
                    next: 2
                },
                {
                    name: "Ayah",
                    text: "Ayah sangat bangga kepadamu. Teruslah tekun menggarap lahan di kota ini agar kehidupan kita semakin sejahtera dan sukses!",
                    choices: [
                        { text: "Terima kasih, Ayah! Saya akan terus berjuang!", action: () => this.closeDialog() }
                    ]
                }
            ]);
            return;
        }

        // Dialog khusus Ibu (Chapter 2)
        if (npcType === 'npc_ibu') {
            this.showDialog([
                {
                    name: "Ibu",
                    text: "Aduh anakku sayang... Ibu bersyukur sekali punya anak sepertimu. Terima kasih ya sudah bekerja keras demi keluarga kita.",
                    next: 1
                },
                {
                    name: "Ibu",
                    text: "Karena kamu berhasil melunasi hutang kita, sekarang kita tidak perlu hidup dalam ketakutan lagi dan bahkan bisa pindah ke kota besar ini.",
                    next: 2
                },
                {
                    name: "Ibu",
                    text: "Ibu akan selalu mendoakan agar usaha tanimu di kota Agropolitan ini dilancarkan dan menghasilkan banyak berkah. Jaga kesehatanmu ya, Nak!",
                    choices: [
                        { text: "Sama-sama Ibu, doa Ibu adalah penyemangatku!", action: () => this.closeDialog() }
                    ]
                }
            ]);
            return;
        }

        if (ch === 1 && !this.state.story.debtPaid) {
            // === Chapter 1: Pak Karsa memberi tanah, tapi ada hutang ===
            const totalCash = this.state.cash;
            const debt = 50000;

            if (!this.state.story._firstTalk) {
                // Dialog perkenalan pertama kali
                this.showDialog([
                    {
                        name: "Pak Karsa",
                        text: "Hei, kamu anak muda yang baru pindah ke desa ini ya? Namaku Pak Karsa, ketua RT sekaligus pemilik lahan di sini.",
                        next: 1
                    },
                    {
                        name: "Pak Karsa",
                        text: "Jujur saja, aku punya satu bidang tanah kosong yang sudah lama tidak terpakai. Aku mau pinjamkan kepadamu untuk bercocok tanam.",
                        next: 2
                    },
                    {
                        name: "Pak Karsa",
                        text: "Tapi ada syaratnya! Aku beri kamu tanah ini gratis — namun kamu harus mengembalikan biaya sewa sebesar Rp 50.000 kepadaku setelah hasil panenmu cukup.",
                        next: 3
                    },
                    {
                        name: "Pak Karsa",
                        text: "Ayo semangat! Kalau hutangmu sudah lunas, aku akan bicara tentang masa depanmu di sini. Temui aku lagi setelah Kas-mu melebihi Rp 50.000!",
                        choices: [
                            { text: "✅ Siap, Pak! Saya akan bekerja keras!", action: () => {
                                this.state.story._firstTalk = true;
                                this.updateChapterInfoHUD();
                                this.saveGame();
                                this.closeDialog();
                            }},
                            { text: "❓ Kenapa harus bayar sewa?", action: () => {
                                this.closeDialog();
                                setTimeout(() => this.talkToNPC(npcType), 100);
                            }}
                        ]
                    }
                ]);
                return;
            }

            // Dialog berikutnya setelah perkenalan
            if (totalCash < debt) {
                this.showDialog([
                    {
                        name: "Pak Karsa",
                        text: `Bagaimana hasilnya? Kas kamu saat ini: Rp ${this.formatNumber(totalCash)}. Masih kurang dari Rp ${this.formatNumber(debt)} untuk melunasi sewa.`,
                        next: 1
                    },
                    {
                        name: "Pak Karsa",
                        text: "Tenang saja, aku tidak terburu-buru. Tapi semakin cepat kamu lunasi, semakin cepat kamu bisa memikirkan masa depan yang lebih cerah.",
                        choices: [
                            { text: "Baik, saya akan terus bekerja keras!", action: () => this.closeDialog() }
                        ]
                    }
                ]);
            } else {
                // Bayar hutang
                this.showDialog([
                    {
                        name: "Pak Karsa",
                        text: `Wah! Kas-mu sudah Rp ${this.formatNumber(totalCash)}! Kamu memang anak yang tekun. Sekarang lunasi dulu sewa lahan Rp ${this.formatNumber(debt)}.`,
                        choices: [
                            { text: `💰 Bayar Sewa Rp ${this.formatNumber(debt)}`, action: () => {
                                this.state.cash -= debt;
                                this.state.story.debtPaid = true;
                                this.updateHUD();
                                this.saveGame();
                                this.closeDialog();
                                setTimeout(() => {
                                    this.showDialog([
                                        {
                                            name: "Pak Karsa",
                                            text: "Terima kasih telah melunasi sewa! Kamu membuktikan bahwa bertani bisa menghidupimu.",
                                            next: 1
                                        },
                                        {
                                            name: "Pak Karsa",
                                            text: "Ngomong-ngomong, ada kabar dari kota Agropolitan. Mereka butuh petani muda yang mau pindah ke sana dan kelola lahan kota yang lebih besar.",
                                            next: 2
                                        },
                                        {
                                            name: "Pak Karsa",
                                            text: "Tapi untuk bisa membeli rumah di kota dan memulai bisnis pertanian di sana, kamu perlu modal: minimal Rp 350.000 di kas dan sudah punya 5 petak lahan di sini.",
                                            next: 3
                                        },
                                        {
                                            name: "Pak Karsa",
                                            text: "Siapkan dirimu! Beli lahan baru di sekitar sini dan kumpulkan modal. Kalau sudah siap, temui aku lagi!",
                                            choices: [
                                                { text: "🌟 Saya akan menuju Chapter 2!", action: () => {
                                                    this.updateChapterInfoHUD();
                                                    this.closeDialog();
                                                }}
                                            ]
                                        }
                                    ]);
                                }, 300);
                            }},
                            { text: "Nanti dulu...", action: () => this.closeDialog() }
                        ]
                    }
                ]);
            }
        } else if (ch === 1 && this.state.story.debtPaid) {
            // === Chapter 1: Utang lunas, menunggu pindah ke Ch2 ===
            const targetCash = 350000;
            const targetPlots = 5;
            const currentCash = this.state.cash;
            const currentPlots = this.state.story.plotsBought;
            const cashOK = currentCash >= targetCash;
            const plotsOK = currentPlots >= targetPlots;

            if (cashOK && plotsOK) {
                this.showDialog([
                    {
                        name: "Pak Karsa",
                        text: `Luar biasa! Kas kamu Rp ${this.formatNumber(currentCash)} dan kamu sudah punya ${currentPlots} petak lahan tambahan. Kamu sudah siap ke Kota Agropolitan!`,
                        next: 1
                    },
                    {
                        name: "Pak Karsa",
                        text: "Ingat, di kota harga jual lebih tinggi 20% karena permintaan sayur dan buah dari kota lebih besar. Ini peluang emas!",
                        choices: [
                            { text: "🚀 Berangkat ke Kota Agropolitan!", action: () => {
                                this.closeDialog();
                                this.triggerChapterTransition(2);
                            }},
                            { text: "Belum siap, nanti dulu.", action: () => this.closeDialog() }
                        ]
                    }
                ]);
            } else {
                const missingList = [];
                if (!cashOK) missingList.push(`💰 Kas minimal Rp ${this.formatNumber(targetCash)} (sekarang: Rp ${this.formatNumber(currentCash)})`);
                if (!plotsOK) missingList.push(`🌾 Beli ${targetPlots} petak lahan (sudah: ${currentPlots}/${targetPlots})`);
                this.showDialog([
                    {
                        name: "Pak Karsa",
                        text: "Kamu belum memenuhi syarat pindah ke kota. Yang masih kurang:",
                        next: 1
                    },
                    {
                        name: "Pak Karsa",
                        text: missingList.join('\n'),
                        choices: [
                            { text: "Oke, saya akan terus berusaha!", action: () => this.closeDialog() }
                        ]
                    }
                ]);
            }
        } else if (ch === 2) {
            // === Chapter 2: Dialog Pak Karsa di kota (bisa dimuat dengan mekanik berbeda) ===
            if (this.state.story.gameCleared) {
                this.showDialog([
                    {
                        name: "Pak Karsa (via telepon)",
                        text: "Kamu sudah berhasil! Keluargamu sudah bisa pindah ke kota dan bisnis tanimu sukses besar. Aku bangga, nak!",
                        choices: [
                            { text: "Terima kasih, Pak Karsa! 🎉", action: () => this.closeDialog() }
                        ]
                    }
                ]);
            } else {
                this.showDialog([
                    {
                        name: "Pak Karsa (via telepon)",
                        text: "Bagaimana kehidupan di kota? Harga jual di sini memang lebih tinggi. Manfaatkan peluang ini dengan memperluas lahan dan menanam lebih banyak!",
                        next: 1
                    },
                    {
                        name: "Pak Karsa (via telepon)",
                        text: "Target kamu: kumpulkan Rp 1.000.000 untuk membeli rumah kota dan hidup sejahtera bersama keluarga!",
                        choices: [
                            { text: "Siap, Pak! Saya tidak akan menyerah!", action: () => {
                                this.closeDialog();
                                // Cek apakah target chapter 2 tercapai
                                if (this.state.cash >= 1000000) {
                                    setTimeout(() => this.triggerGameClear(), 500);
                                }
                            }}
                        ]
                    }
                ]);
            }
        }
    }

    // Mesin dialog: menerima array node dialog, tampilkan satu per satu
    showDialog(nodes, index = 0) {
        if (index >= nodes.length) { this.closeDialog(); return; }
        const node = nodes[index];

        const modal = document.getElementById('modal-dialog');
        const nameEl = document.getElementById('dialog-name');
        const textEl = document.getElementById('dialog-text');
        const choicesEl = document.getElementById('dialog-choices');

        modal.classList.remove('hidden');
        nameEl.innerText = node.name || 'Pak Karsa';

        // Efek ketik teks dengan auto-scroll
        textEl.innerText = '';
        choicesEl.innerHTML = '';
        let charIdx = 0;
        let typingDone = false;
        if (this._dialogTypingInterval) clearInterval(this._dialogTypingInterval);

        const finishTyping = () => {
            if (typingDone) return;
            typingDone = true;
            if (this._dialogTypingInterval) {
                clearInterval(this._dialogTypingInterval);
                this._dialogTypingInterval = null;
            }
            textEl.innerText = node.text;
            textEl.scrollTop = textEl.scrollHeight;
            renderButtons();
        };

        this._dialogTypingInterval = setInterval(() => {
            if (charIdx >= node.text.length) {
                finishTyping();
                return;
            }
            textEl.innerText += node.text[charIdx];
            charIdx++;
            // Auto-scroll agar teks terbaru selalu terlihat
            textEl.scrollTop = textEl.scrollHeight;
        }, 22);

        // Klik area teks = skip animasi ketik
        textEl.onclick = () => {
            if (!typingDone) {
                finishTyping();
            }
        };

        const renderButtons = () => {
            choicesEl.innerHTML = '';
            if (node.choices) {
                node.choices.forEach(choice => {
                    const btn = document.createElement('button');
                    btn.className = 'btn-retro';
                    btn.innerText = choice.text;
                    btn.addEventListener('click', () => {
                        audioManager.playSFX('sfx_click');
                        textEl.onclick = null;
                        choice.action();
                    });
                    choicesEl.appendChild(btn);
                });
            } else if (node.next !== undefined) {
                const btn = document.createElement('button');
                btn.className = 'btn-retro';
                btn.innerText = '▶ Lanjut';
                btn.addEventListener('click', () => {
                    audioManager.playSFX('sfx_click');
                    textEl.onclick = null;
                    this.showDialog(nodes, index + 1);
                });
                choicesEl.appendChild(btn);
            }
        };
    }

    closeDialog() {
        const modal = document.getElementById('modal-dialog');
        if (modal) modal.classList.add('hidden');
        if (this._dialogTypingInterval) {
            clearInterval(this._dialogTypingInterval);
            this._dialogTypingInterval = null;
        }
    }

    buySoilPlot(cell) {
        if (!cell || cell.type !== 'locked_soil') return;
        if (this.state.cash < LOCKED_SOIL_PRICE) {
            this.showNotification(`❌ Kas tidak cukup! Butuh Rp ${this.formatNumber(LOCKED_SOIL_PRICE)} untuk membeli petak ini.`);
            return;
        }

        this.state.cash -= LOCKED_SOIL_PRICE;
        cell.type = 'soil';
        cell.soilState = 'grass';
        cell.crop = null;
        this.state.story.plotsBought++;

        audioManager.playSFX('sfx_plant');
        this.updateHUD();
        this.updateChapterInfoHUD();
        this.showNotification(`🌾 Petak lahan baru dibeli! (${this.state.story.plotsBought} petak total) Cangkul dulu untuk bisa ditanami.`);
        this.saveGame();
        this.updateSelectedCell();
    }

    updateChapterInfoHUD() {
        // Buat atau update elemen info chapter di HUD
        let el = document.getElementById('hud-chapter-info');
        if (!el) {
            el = document.createElement('div');
            el.id = 'hud-chapter-info';
            const gameScreen = document.getElementById('game-screen');
            if (gameScreen) gameScreen.appendChild(el);
        }

        const ch = this.state.story;
        let text = '';
        if (ch.chapter === 1 && !ch.debtPaid) {
            text = `📜 CH1: Lunasi sewa Rp 50.000`;
        } else if (ch.chapter === 1 && ch.debtPaid) {
            const plotsOK = ch.plotsBought >= 5;
            const cashOK = this.state.cash >= 350000;
            text = `🎯 Pindah Kota: Kas Rp 350k ${cashOK ? '✅' : '❌'} | Lahan ${ch.plotsBought}/5 ${plotsOK ? '✅' : '❌'}`;
        } else if (ch.chapter === 2) {
            const done = ch.gameCleared;
            text = done ? `🏆 GAME CLEAR! Keluargamu sejahtera!` : `🏙️ CH2: Kumpulkan Rp 1.000.000`;
        }
        el.innerText = text;

        // Perbarui tema background game screen berdasarkan chapter
        this.updateBackgroundTheme();
    }

    updateBackgroundTheme() {
        const screen = document.getElementById('game-screen');
        if (!screen) return;
        const ch = this.state.story.chapter;
        if (ch === 2) {
            screen.classList.remove('chapter-1');
            screen.classList.add('chapter-2');
        } else {
            screen.classList.remove('chapter-2');
            screen.classList.add('chapter-1');
        }
    }

    triggerChapterTransition(targetChapter) {
        const overlay = document.getElementById('chapter-transition-overlay');
        const badgeEl = document.getElementById('chapter-badge-text');
        const titleEl = document.getElementById('chapter-title-big');
        const descEl = document.getElementById('chapter-desc');

        // Set konten chapter 2
        if (targetChapter === 2) {
            badgeEl.innerText = 'CHAPTER 2';
            titleEl.innerText = 'Kota Agropolitan';
            descEl.innerText = 'Harga jual lebih tinggi! Kembangkan ladangmu di kota besar...';
        }

        // Tampilkan overlay hitam dengan efek fade-in
        overlay.classList.remove('hidden', 'fade-out');
        overlay.classList.add('fade-in');

        // Setelah 3.5 detik, lakukan transisi state dan fade-out
        setTimeout(() => {
            // Update state chapter
            this.state.story.chapter = targetChapter;
            this.state.story.debtPaid = true;
            this.updateHUD();
            this.updateChapterInfoHUD();

            // Pasang entitas Chapter 2 (rumah, ayah, ibu)
            if (targetChapter === 2) {
                this.setupChapter2GridEntities();
            }

            // Tambah beberapa lahan terbuka otomatis di chapter 2
            for (let r = 0; r < this.rows; r++) {
                for (let c = 0; c < this.cols; c++) {
                    if (this.state.grid[r][c].type === 'locked_soil') {
                        // Di chapter 2 semua locked_soil di baris atas terbuka gratis
                        if (r === 2) {
                            this.state.grid[r][c].type = 'soil';
                            this.state.grid[r][c].soilState = 'grass';
                        }
                    }
                }
            }

            this.saveGame();

            // Fade out setelah konten terlihat
            overlay.classList.remove('fade-in');
            overlay.classList.add('fade-out');

            setTimeout(() => {
                overlay.classList.add('hidden');
                overlay.classList.remove('fade-out');
                this.showNotification('🏙️ Selamat datang di Kota Agropolitan! Harga jual +20%!');
            }, 800);
        }, 3500);
    }

    triggerGameClear() {
        this.state.story.gameCleared = true;
        this.saveGame();
        this.showDialog([
            {
                name: "Narator",
                text: "Kerja kerasmu selama ini tidak sia-sia. Dengan modal Rp 1.000.000, kamu berhasil membeli rumah di Kota Agropolitan...",
                next: 1
            },
            {
                name: "Narator",
                text: "Keluargamu akhirnya bisa pindah bersama-sama. Orang tuamu tersenyum melihat keberhasilanmu. Bisnis pertanian kotamu kini terkenal di seluruh wilayah!",
                next: 2
            },
            {
                name: "Pak Karsa (via telepon)",
                text: "Kamu membuktikan bahwa seorang petani muda bisa mengubah nasib dengan kerja keras dan ketekunan. Selamat! 🎉",
                choices: [
                    { text: "🏆 GAME CLEAR! Terima Kasih!", action: () => {
                        this.closeDialog();
                        this.updateChapterInfoHUD();
                    }}
                ]
            }
        ]);
    }

    // --- 9. FARMING MECHANICS ---
    plantCrop(cropType) {
        if (!this.selectedGridCell || this.selectedGridCell.type !== 'soil') return;
        const cell = this.selectedGridCell;

        if (this.state.inventory[`seed_${cropType}`] <= 0) {
            this.showNotification("❌ Anda tidak memiliki bibit tersebut!");
            return;
        }

        // Ambil data bibit
        const config = CROPS_CONFIG[cropType];
        
        // Cek level tanaman
        if (this.state.level < config.unlockedAt) {
            this.showNotification("❌ Level Anda belum mencukupi!");
            return;
        }

        // Tanam bibit
        audioManager.playSFX('sfx_plant');
        this.state.inventory[`seed_${cropType}`]--;
        
        let growTime = config.growTime;
        // Efek Sumur Otomatis: Mempercepat waktu tumbuh 20%
        if (this.state.hasAutoWell) {
            growTime *= 0.8;
        }

        cell.crop = {
            type: cropType,
            progress: 0,
            watered: cell.soilState === 'watered',
            timer: 0,
            totalTime: growTime
        };

        this.addActionFeedback(cell.x, cell.y, '🌱', 1000);
        this.closeModal('modal-tas');
        this.showNotification(`🌱 Berhasil menanam ${config.name}!`);
        this.updateSelectedCell();
        this.saveGame();
    }

    harvestCrop(cell) {
        if (!cell.crop || cell.crop.progress < 1) return;

        // Cek kapasitas Silo
        const totalItemsInSilo = Object.keys(this.state.inventory)
            .filter(key => key.startsWith('crop_'))
            .reduce((sum, key) => sum + this.state.inventory[key], 0);

        if (totalItemsInSilo >= this.state.siloCapacity) {
            audioManager.playSFX('sfx_click');
            this.showNotification("❌ Lumbung SILO Penuh! Silakan jual hasil panen dulu.");
            return;
        }

        const type = cell.crop.type;
        const config = CROPS_CONFIG[type];

        audioManager.playSFX('sfx_harvest');
        this.state.inventory[`crop_${type}`]++;
        this.addXP(config.xpYield);

        this.addActionFeedback(cell.x, cell.y, '🧺', 1200);
        this.showNotification(`🧺 Berhasil memanen ${config.name}! (+${config.xpYield} XP)`);
        
        // Reset petak kembali ke rumput
        cell.crop = null;
        cell.soilState = 'grass';

        this.updateSelectedCell();
        this.saveGame();
    }

    // --- 10. REAL-TIME GAME LOOP ---
    gameLoop() {
        const now = Date.now();
        const delta = (now - (this.lastTime || now)) / 1000;
        this.lastTime = now;

        // Hanya jalankan waktu game jika layar aktif bermain dan TIDAK dalam keadaan Jeda/Pause
        if (this.state.screen === 'playing' && !this.state.isPaused) {
            this.updateTimeAndCrops(delta);
        }

        this.render();
        requestAnimationFrame(() => this.gameLoop());
    }

    updateTimeAndCrops(delta) {
        // Update Hari (1 Hari = 150 Detik agar jalannya waktu santai dan tidak terburu-buru!)
        this.state.dayTimer += delta;
        if (this.state.dayTimer >= 150) {
            this.state.dayTimer = 0;
            this.state.day++;
            this.showNotification(`📅 Hari berganti! Selamat pagi di Hari ke-${this.state.day}!`);

            audioManager.playSFX('sfx_levelup');
            
            // Keringkan kembali semua lahan tani yang kosong di hari baru
            for (let r = 0; r < this.rows; r++) {
                for (let c = 0; c < this.cols; c++) {
                    const cell = this.state.grid[r][c];
                    if (cell.type === 'soil' && !cell.crop) {
                        cell.soilState = 'grass';
                    }
                }
            }
            this.updateHUD();
            this.saveGame();
        }

        // Update Pertumbuhan Tanaman
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const cell = this.state.grid[r][c];
                if (cell.type === 'soil' && cell.crop && cell.crop.progress < 1) {
                    // Tanaman hanya tumbuh jika tanah dalam keadaan disiram (watered)
                    if (cell.crop.watered) {
                        cell.crop.timer += delta;
                        cell.crop.progress = Math.min(cell.crop.timer / cell.crop.totalTime, 1);

                        // Keringkan tanah secara acak atau ketika panen selesai
                        if (cell.crop.progress >= 1) {
                            cell.crop.progress = 1;
                        }
                    }
                }
            }
        }
    }

    // --- 11. CANVAS DRAWING (PIXEL ART) ---
    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.state.screen !== 'playing') return;

        // A. Draw Grid Map
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const cell = this.state.grid[r][c];
                const px = c * this.tileSize;
                const py = r * this.tileSize;
                const ts = this.tileSize;

                // =====================================================
                // STEP 1: Gambar Layer Background sesuai TYPE dan STATE
                // =====================================================

                if (cell.type === 'river') {
                    // Sungai: gambar tile air
                    if (this.images.tileRiver) {
                        this.ctx.drawImage(this.images.tileRiver, px, py, ts, ts);
                    } else {
                        this.ctx.fillStyle = '#4dd0e1';
                        this.ctx.fillRect(px, py, ts, ts);
                    }
                    // Efek riak animasi
                    this.ctx.fillStyle = 'rgba(255,255,255,0.4)';
                    const riakY = py + Math.floor((Date.now() / 500 + c) % (ts/8)) * 8;
                    this.ctx.fillRect(px + 8, riakY, 18, 3);
                    this.ctx.fillRect(px + 38, riakY + 16, 12, 3);

                } else if (cell.type === 'soil') {
                    // ===== LAHAN PERTANIAN: tampilkan state yang tepat =====
                    if (cell.soilState === 'grass') {
                        // Tanah belum dicangkul: Tampilkan "Garden Bed" (Tanah Lahan Tani yang siap)
                        if (this.images.tileGrass) {
                            this.ctx.drawImage(this.images.tileGrass, px, py, ts, ts);
                        } else {
                            this.ctx.fillStyle = '#7cb342'; // Rumput hijau kebun
                            this.ctx.fillRect(px, py, ts, ts);
                        }
                        
                        // Lapis tanah gembur kecokelatan di tengah petak
                        this.ctx.fillStyle = '#c7a75c'; // Tanah gembur gersang khas kebun
                        this.ctx.fillRect(px + 6, py + 6, ts - 12, ts - 12);
                        
                        // Garis alur cangkul pudar penanda siap digarap
                        this.ctx.fillStyle = '#a1887f';
                        this.ctx.fillRect(px + 14, py + 18, ts - 28, 4);
                        this.ctx.fillRect(px + 14, py + 30, ts - 28, 4);
                        this.ctx.fillRect(px + 14, py + 42, ts - 28, 4);

                        // Rumput kecil hijau liar di atas tanah gembur
                        this.ctx.fillStyle = '#689f38';
                        this.ctx.fillRect(px + 10, py + 10, 4, 4);
                        this.ctx.fillRect(px + ts - 14, py + ts - 14, 4, 4);

                        // Outline kayu pelindung petak sawah individual
                        this.ctx.strokeStyle = '#5d4037';
                        this.ctx.lineWidth = 2;
                        this.ctx.strokeRect(px + 5, py + 5, ts - 10, ts - 10);


                    } else if (cell.soilState === 'plowed') {
                        // Tanah SUDAH DICANGKUL: cokelat kering
                        if (this.images.tileSoilDry) {
                            this.ctx.drawImage(this.images.tileSoilDry, px, py, ts, ts);
                        } else {
                            this.ctx.fillStyle = '#8d6e63';
                            this.ctx.fillRect(px, py, ts, ts);
                            // Garis alur cangkul manual
                            this.ctx.fillStyle = '#6d4c41';
                            this.ctx.fillRect(px + 10, py + 14, ts - 20, 5);
                            this.ctx.fillRect(px + 10, py + 28, ts - 20, 5);
                            this.ctx.fillRect(px + 10, py + 42, ts - 20, 5);
                        }
                        // Overlay sedikit agar lebih kontras dari grass
                        this.ctx.fillStyle = 'rgba(60,20,0,0.1)';
                        this.ctx.fillRect(px, py, ts, ts);

                    } else if (cell.soilState === 'watered') {
                        // Tanah SUDAH DISIRAM: cokelat tua basah berkilap
                        if (this.images.tileSoilWet) {
                            this.ctx.drawImage(this.images.tileSoilWet, px, py, ts, ts);
                        } else {
                            this.ctx.fillStyle = '#4e342e';
                            this.ctx.fillRect(px, py, ts, ts);
                        }
                        // Efek kilap air di tanah basah
                        this.ctx.fillStyle = 'rgba(100,200,255,0.2)';
                        this.ctx.fillRect(px + 12, py + 10, ts - 24, 6);
                        this.ctx.fillRect(px + 16, py + 28, ts - 32, 5);
                    }

                } else if (cell.type === 'locked_soil') {
                    // Lahan terkunci: tampilkan sebagai tanah gelap bergaris merah
                    this.ctx.fillStyle = '#4e342e';
                    this.ctx.fillRect(px, py, ts, ts);
                    this.ctx.fillStyle = 'rgba(40,0,0,0.5)';
                    this.ctx.fillRect(px, py, ts, ts);
                } else {
                    // Tile rumput biasa (fence, shop, silo, well, export, grass)
                    if (this.images.tileGrass) {
                        this.ctx.drawImage(this.images.tileGrass, px, py, ts, ts);
                    } else {
                        this.ctx.fillStyle = '#a5d6a7';
                        this.ctx.fillRect(px, py, ts, ts);
                    }
                }

                // =====================================================
                // STEP 2: Gambar Layer Bangunan / Pagar di atas background
                // =====================================================

                if (cell.type === 'fence') {
                    // Pagar Kayu bergaya pixel dengan papan horizontal dan tiang vertikal
                    this.ctx.fillStyle = '#6d4c41';
                    this.ctx.fillRect(px, py + ts/2 - 10, ts, 10); // Papan atas
                    this.ctx.fillRect(px, py + ts/2 + 5, ts, 10);  // Papan bawah
                    this.ctx.fillStyle = '#4e342e';
                    this.ctx.fillRect(px + 8, py, 10, ts);          // Tiang kiri
                    this.ctx.fillRect(px + ts - 18, py, 10, ts);    // Tiang kanan
                    // Highlight ujung tiang
                    this.ctx.fillStyle = '#8d6e63';
                    this.ctx.fillRect(px + 9, py + 1, 4, ts - 2);
                    this.ctx.fillRect(px + ts - 17, py + 1, 4, ts - 2);
                }
                else if (cell.type === 'silo') {
                    if (this.images.building_silo) {
                        this.ctx.drawImage(this.images.building_silo, px, py, ts, ts);
                    } else {
                        // ===== LUMBUNG SILO (Barn Merah Klasik) =====
                        // Dinding utama
                        this.ctx.fillStyle = '#c62828';
                        this.ctx.fillRect(px + 4, py + 20, ts - 8, ts - 22);
                        // Dinding sisi terang
                        this.ctx.fillStyle = '#ef5350';
                        this.ctx.fillRect(px + 4, py + 20, 8, ts - 22);
                        // Atap segitiga
                        this.ctx.fillStyle = '#b71c1c';
                        this.ctx.beginPath();
                        this.ctx.moveTo(px, py + 22);
                        this.ctx.lineTo(px + ts/2, py + 2);
                        this.ctx.lineTo(px + ts, py + 22);
                        this.ctx.fill();
                        // Garis atap terang
                        this.ctx.fillStyle = '#e53935';
                        this.ctx.beginPath();
                        this.ctx.moveTo(px + 2, py + 22);
                        this.ctx.lineTo(px + ts/2, py + 4);
                        this.ctx.lineTo(px + 8, py + 22);
                        this.ctx.fill();
                        // Pintu gudang
                        this.ctx.fillStyle = '#3e2723';
                        this.ctx.fillRect(px + ts/2 - 10, py + 36, 20, ts - 38);
                        // Busur pintu
                        this.ctx.fillStyle = '#5d4037';
                        this.ctx.beginPath();
                        this.ctx.arc(px + ts/2, py + 36, 10, Math.PI, 0);
                        this.ctx.fill();
                        // Engsel pintu
                        this.ctx.fillStyle = '#ffd54f';
                        this.ctx.fillRect(px + ts/2 + 6, py + 44, 4, 4);
                        // Label teks
                        this.ctx.fillStyle = '#fff';
                        this.ctx.font = `bold 9px 'Outfit', sans-serif`;
                        this.ctx.textAlign = 'center';
                        this.ctx.fillText('SILO', px + ts/2, py + 18);
                    }
                }
                else if (cell.type === 'shop') {
                    if (this.images.building_shop) {
                        this.ctx.drawImage(this.images.building_shop, px, py, ts, ts);
                    } else {
                        // ===== TOKO DESA (Warung Retro) =====
                        // Dinding
                        this.ctx.fillStyle = '#ffe0b2';
                        this.ctx.fillRect(px + 2, py + 22, ts - 4, ts - 24);
                        // Atap segitiga kuning
                        this.ctx.fillStyle = '#f57c00';
                        this.ctx.beginPath();
                        this.ctx.moveTo(px - 2, py + 24);
                        this.ctx.lineTo(px + ts/2, py + 4);
                        this.ctx.lineTo(px + ts + 2, py + 24);
                        this.ctx.fill();
                        // Strip kain awning bergaris
                        this.ctx.fillStyle = '#ffb300';
                        this.ctx.fillRect(px + 2, py + 24, ts - 4, 8);
                        for (let i = 0; i < 5; i++) {
                            this.ctx.fillStyle = i % 2 === 0 ? '#ff8f00' : '#ffca28';
                            this.ctx.fillRect(px + 4 + i * 11, py + 24, 10, 8);
                        }
                        // Meja etalase
                        this.ctx.fillStyle = '#8d6e63';
                        this.ctx.fillRect(px + 4, py + 38, ts - 8, 8);
                        // Jendela barang dagangan
                        this.ctx.fillStyle = '#b3e5fc';
                        this.ctx.fillRect(px + 10, py + 30, 16, 8);
                        this.ctx.fillRect(px + ts - 26, py + 30, 16, 8);
                        // Pintu toko
                        this.ctx.fillStyle = '#5d4037';
                        this.ctx.fillRect(px + ts/2 - 8, py + 44, 16, ts - 46);
                        // Label
                        this.ctx.fillStyle = '#fff';
                        this.ctx.font = `bold 9px 'Outfit', sans-serif`;
                        this.ctx.textAlign = 'center';
                        this.ctx.fillText('TOKO', px + ts/2, py + 20);
                    }
                }
                else if (cell.type === 'well') {
                    // ===== SUMUR =====
                    const wellActive = this.state.hasAutoWell;
                    if (this.images.building_well) {
                        this.ctx.drawImage(this.images.building_well, px, py, ts, ts);
                        // Efek kilau jika aktif
                        if (wellActive) {
                            this.ctx.fillStyle = 'rgba(0,230,118,0.2)';
                            this.ctx.fillRect(px + 4, py + 4, ts - 8, ts - 8);
                            // Draw an active label
                            this.ctx.fillStyle = '#00e676';
                            this.ctx.font = `bold 8px 'Outfit', sans-serif`;
                            this.ctx.textAlign = 'center';
                            this.ctx.fillText('OTOMATIS', px + ts/2, py + 8);
                        } else {
                            this.ctx.fillStyle = '#fff';
                            this.ctx.font = `bold 8px 'Outfit', sans-serif`;
                            this.ctx.textAlign = 'center';
                            this.ctx.fillText('SUMUR', px + ts/2, py + 8);
                        }
                    } else {
                        // Dinding sumur batu bata
                        this.ctx.fillStyle = '#9e9e9e';
                        this.ctx.fillRect(px + 12, py + 34, ts - 24, ts - 36);
                        // Bata detail
                        this.ctx.fillStyle = '#bdbdbd';
                        this.ctx.fillRect(px + 14, py + 36, ts - 28, 6);
                        this.ctx.fillRect(px + 16, py + 46, ts - 32, 6);
                        // Tiang kayu
                        this.ctx.fillStyle = '#5d4037';
                        this.ctx.fillRect(px + 12, py + 10, 8, 26);
                        this.ctx.fillRect(px + ts - 20, py + 10, 8, 26);
                        // Atap
                        this.ctx.fillStyle = wellActive ? '#00e676' : '#8d6e63';
                        this.ctx.fillRect(px + 8, py + 6, ts - 16, 8);
                        // Tali sumur
                        this.ctx.strokeStyle = '#212121';
                        this.ctx.lineWidth = 2;
                        this.ctx.beginPath();
                        this.ctx.moveTo(px + ts/2, py + 14);
                        this.ctx.lineTo(px + ts/2, py + 34);
                        this.ctx.stroke();
                        // Timba
                        this.ctx.fillStyle = '#78909c';
                        this.ctx.fillRect(px + ts/2 - 6, py + 30, 12, 8);
                        // Efek kilau jika aktif
                        if (wellActive) {
                            this.ctx.fillStyle = 'rgba(0,230,118,0.3)';
                            this.ctx.fillRect(px + 12, py + 34, ts - 24, ts - 36);
                        }
                        // Label
                        this.ctx.fillStyle = wellActive ? '#00e676' : '#fff';
                        this.ctx.font = `bold 8px 'Outfit', sans-serif`;
                        this.ctx.textAlign = 'center';
                        this.ctx.fillText(wellActive ? 'OTOMATIS' : 'SUMUR', px + ts/2, py + 8);
                    }
                }
                else if (cell.type === 'export') {
                    // ===== TOKO EKSPOR =====
                    const expActive = this.state.hasExportShop;
                    if (this.images.building_export) {
                        this.ctx.drawImage(this.images.building_export, px, py, ts, ts);
                        // Efek kilau jika aktif
                        if (expActive) {
                            this.ctx.fillStyle = 'rgba(2,136,209,0.2)';
                            this.ctx.fillRect(px + 4, py + 4, ts - 8, ts - 8);
                            this.ctx.fillStyle = '#80d8ff';
                            this.ctx.font = `bold 8px 'Outfit', sans-serif`;
                            this.ctx.textAlign = 'center';
                            this.ctx.fillText('BUKA', px + ts/2, py + 16);
                        } else {
                            this.ctx.fillStyle = '#fff';
                            this.ctx.font = `bold 8px 'Outfit', sans-serif`;
                            this.ctx.textAlign = 'center';
                            this.ctx.fillText('EKSPOR', px + ts/2, py + 16);
                        }
                    } else {
                        // Bangunan utama
                        this.ctx.fillStyle = expActive ? '#0288d1' : '#78909c';
                        this.ctx.fillRect(px + 4, py + 18, ts - 8, ts - 20);
                        // Atap kubah
                        this.ctx.fillStyle = expActive ? '#01579b' : '#546e7a';
                        this.ctx.beginPath();
                        this.ctx.moveTo(px + 4, py + 20);
                        this.ctx.lineTo(px + ts/2, py + 2);
                        this.ctx.lineTo(px + ts - 4, py + 20);
                        this.ctx.fill();
                        // Lambang globe
                        this.ctx.strokeStyle = expActive ? '#80d8ff' : '#cfd8dc';
                        this.ctx.lineWidth = 2;
                        this.ctx.beginPath();
                        this.ctx.arc(px + ts/2, py + 36, 12, 0, Math.PI * 2);
                        this.ctx.stroke();
                        this.ctx.beginPath();
                        this.ctx.moveTo(px + ts/2, py + 24);
                        this.ctx.lineTo(px + ts/2, py + 48);
                        this.ctx.stroke();
                        this.ctx.beginPath();
                        this.ctx.moveTo(px + ts/2 - 12, py + 36);
                        this.ctx.lineTo(px + ts/2 + 12, py + 36);
                        this.ctx.stroke();
                        // Pintu
                        this.ctx.fillStyle = '#263238';
                        this.ctx.fillRect(px + ts/2 - 8, py + 46, 16, ts - 48);
                        // Label
                        this.ctx.fillStyle = expActive ? '#80d8ff' : '#fff';
                        this.ctx.font = `bold 8px 'Outfit', sans-serif`;
                        this.ctx.textAlign = 'center';
                        this.ctx.fillText('EKSPOR', px + ts/2, py + 16);
                    }
                }

                // ===== LAHAN TERKUNCI (Locked Soil) =====
                else if (cell.type === 'locked_soil') {
                    // Garis silang merah tanda terkunci
                    this.ctx.strokeStyle = 'rgba(183,28,28,0.7)';
                    this.ctx.lineWidth = 3;
                    this.ctx.beginPath();
                    this.ctx.moveTo(px + 8, py + 8);
                    this.ctx.lineTo(px + ts - 8, py + ts - 8);
                    this.ctx.stroke();
                    this.ctx.beginPath();
                    this.ctx.moveTo(px + ts - 8, py + 8);
                    this.ctx.lineTo(px + 8, py + ts - 8);
                    this.ctx.stroke();
                    // Border merah
                    this.ctx.strokeStyle = '#c62828';
                    this.ctx.lineWidth = 2;
                    this.ctx.strokeRect(px + 4, py + 4, ts - 8, ts - 8);
                    // Ikon gembok
                    this.ctx.fillStyle = '#ffd54f';
                    const lx = px + ts/2 - 7;
                    const ly = py + ts/2 - 9;
                    this.ctx.fillRect(lx + 3, ly + 7, 8, 7); // Body gembok
                    this.ctx.strokeStyle = '#ffd54f';
                    this.ctx.lineWidth = 2.5;
                    this.ctx.beginPath();
                    this.ctx.arc(lx + 7, ly + 7, 4.5, Math.PI, 0);
                    this.ctx.stroke();
                    // Harga label
                    this.ctx.fillStyle = '#ffd54f';
                    this.ctx.font = `bold 7px 'Outfit', sans-serif`;
                    this.ctx.textAlign = 'center';
                    this.ctx.fillText(`Rp ${this.formatNumber(LOCKED_SOIL_PRICE)}`, px + ts/2, py + ts - 6);
                }

                // ===== NPC PAK KARSA =====
                else if (cell.type === 'npc') {
                    // Tubuh petani
                    this.ctx.fillStyle = '#1565c0'; // Baju biru
                    this.ctx.fillRect(px + 18, py + 32, 28, 24);
                    // Kepala
                    this.ctx.fillStyle = '#d4a066'; // Kulit
                    this.ctx.fillRect(px + 20, py + 14, 24, 20);
                    // Caping/Topi
                    this.ctx.fillStyle = '#8d6e30';
                    this.ctx.beginPath();
                    this.ctx.moveTo(px + 10, py + 18);
                    this.ctx.lineTo(px + ts/2, py + 4);
                    this.ctx.lineTo(px + ts - 10, py + 18);
                    this.ctx.fill();
                    // Tali caping
                    this.ctx.fillStyle = '#6d4c00';
                    this.ctx.fillRect(px + 10, py + 16, ts - 20, 4);
                    // Mata
                    this.ctx.fillStyle = '#1a1a1a';
                    this.ctx.fillRect(px + 24, py + 22, 4, 4);
                    this.ctx.fillRect(px + 35, py + 22, 4, 4);
                    // Kumis
                    this.ctx.fillStyle = '#5d4037';
                    this.ctx.fillRect(px + 22, py + 30, 20, 2);
                    // Kaki
                    this.ctx.fillStyle = '#3e2723';
                    this.ctx.fillRect(px + 20, py + 54, 10, ts - 56);
                    this.ctx.fillRect(px + ts - 30, py + 54, 10, ts - 56);
                    // Exclamation mark (!) penanda quest
                    const bounce = Math.abs(Math.sin(Date.now() / 400)) * 4;
                    this.ctx.fillStyle = '#ffd600';
                    this.ctx.font = `bold 14px 'Outfit', sans-serif`;
                    this.ctx.textAlign = 'center';
                    this.ctx.fillText('!', px + ts/2, py + 6 - bounce);
                }

                // ===== ASET RUMAH (Chapter 2) =====
                else if (cell.type === 'house') {
                    // Dinding rumah modern abu-abu terang
                    this.ctx.fillStyle = '#b0bec5';
                    this.ctx.fillRect(px + 4, py + 16, ts - 8, ts - 18);
                    
                    // Atap segitiga biru premium
                    this.ctx.fillStyle = '#1565c0';
                    this.ctx.beginPath();
                    this.ctx.moveTo(px, py + 18);
                    this.ctx.lineTo(px + ts/2, py + 2);
                    this.ctx.lineTo(px + ts, py + 18);
                    this.ctx.fill();
                    
                    // Pintu kayu cokelat
                    this.ctx.fillStyle = '#5d4037';
                    this.ctx.fillRect(px + ts/2 - 8, py + 34, 16, ts - 36);
                    
                    // Jendela kaca berkilap
                    this.ctx.fillStyle = '#e0f7fa';
                    this.ctx.fillRect(px + 8, py + 24, 12, 10);
                    this.ctx.fillRect(px + ts - 20, py + 24, 12, 10);
                    // Garis jendela
                    this.ctx.strokeStyle = '#00acc1';
                    this.ctx.lineWidth = 1;
                    this.ctx.strokeRect(px + 8, py + 24, 12, 10);
                    this.ctx.strokeRect(px + ts - 20, py + 24, 12, 10);

                    // Label Rumah
                    this.ctx.fillStyle = '#fff';
                    this.ctx.font = `bold 8px 'Outfit', sans-serif`;
                    this.ctx.textAlign = 'center';
                    this.ctx.fillText('RUMAH', px + ts/2, py + 14);
                }

                // ===== NPC AYAH (Chapter 2) =====
                else if (cell.type === 'npc_ayah') {
                    // Tubuh Ayah
                    this.ctx.fillStyle = '#2e7d32'; // Baju hijau tua
                    this.ctx.fillRect(px + 18, py + 30, 28, 26);
                    // Kepala
                    this.ctx.fillStyle = '#ffcc80'; // Kulit
                    this.ctx.fillRect(px + 20, py + 12, 24, 20);
                    // Rambut abu-abu (tua)
                    this.ctx.fillStyle = '#78909c';
                    this.ctx.fillRect(px + 18, py + 8, 28, 6);
                    this.ctx.fillRect(px + 18, py + 14, 4, 12);
                    this.ctx.fillRect(px + 42, py + 14, 4, 12);
                    // Mata
                    this.ctx.fillStyle = '#212121';
                    this.ctx.fillRect(px + 25, py + 20, 4, 4);
                    this.ctx.fillRect(px + 35, py + 20, 4, 4);
                    // Kaki
                    this.ctx.fillStyle = '#37474f';
                    this.ctx.fillRect(px + 20, py + 56, 10, ts - 58);
                    this.ctx.fillRect(px + ts - 30, py + 56, 10, ts - 58);
                    
                    // Efek hati melayang (kasih sayang orang tua)
                    const heartBounce = Math.abs(Math.sin(Date.now() / 350)) * 3;
                    this.ctx.fillStyle = '#e91e63';
                    this.ctx.font = `bold 10px 'Outfit', sans-serif`;
                    this.ctx.textAlign = 'center';
                    this.ctx.fillText('❤️', px + ts/2, py + 6 - heartBounce);
                }

                // ===== NPC IBU (Chapter 2) =====
                else if (cell.type === 'npc_ibu') {
                    // Tubuh Ibu (gaun pink)
                    this.ctx.fillStyle = '#d81b60'; // Baju pink tua
                    this.ctx.fillRect(px + 18, py + 30, 28, 26);
                    // Kepala
                    this.ctx.fillStyle = '#ffe082'; // Kulit
                    this.ctx.fillRect(px + 20, py + 12, 24, 20);
                    // Rambut hitam diikat (sanggul)
                    this.ctx.fillStyle = '#212121';
                    this.ctx.fillRect(px + 18, py + 6, 28, 8); // Rambut atas
                    this.ctx.fillRect(px + ts/2 - 6, py + 2, 12, 6); // Sanggul
                    this.ctx.fillRect(px + 18, py + 14, 4, 10);
                    this.ctx.fillRect(px + 42, py + 14, 4, 10);
                    // Mata
                    this.ctx.fillStyle = '#212121';
                    this.ctx.fillRect(px + 25, py + 20, 4, 4);
                    this.ctx.fillRect(px + 35, py + 20, 4, 4);
                    // Kaki
                    this.ctx.fillStyle = '#4e342e';
                    this.ctx.fillRect(px + 20, py + 56, 10, ts - 58);
                    this.ctx.fillRect(px + ts - 30, py + 56, 10, ts - 58);
                    
                    // Efek hati melayang
                    const heartBounce = Math.abs(Math.cos(Date.now() / 350)) * 3;
                    this.ctx.fillStyle = '#ff4081';
                    this.ctx.font = `bold 10px 'Outfit', sans-serif`;
                    this.ctx.textAlign = 'center';
                    this.ctx.fillText('❤️', px + ts/2, py + 6 - heartBounce);
                }



                if (cell.type === 'soil' && cell.crop) {
                    const crop = cell.crop;
                    const cnf = CROPS_CONFIG[crop.type];
                    
                    // Hitung efek goyangan angin (Wind Swaying) lembut bergaya Harvest Moon
                    const sway = 0.08 * Math.sin(Date.now() / 400 + c * 0.5 + r * 0.5);
                    
                    this.ctx.save();
                    
                    // Pindahkan poros/pivot rotasi ke bagian bawah-tengah petak tanah
                    const plantPivotX = px + ts / 2;
                    const plantPivotY = py + ts - 10;
                    this.ctx.translate(plantPivotX, plantPivotY);
                    this.ctx.rotate(sway);
                    
                    const progress = crop.progress;
                    
                    if (progress < 0.33) {
                        // Tahap 1: Tunas (Sprout)
                        if (this.images['cropSprout']) {
                            this.ctx.drawImage(this.images['cropSprout'], -16, -32, 32, 32);
                        } else {
                            this.ctx.fillStyle = cnf.colorStage1;
                            this.ctx.fillRect(-5, -10, 10, 10);
                        }
                    } else if (progress < 0.66) {
                        // Tahap 2: Tumbuh (Growing)
                        if (this.images['cropSprout']) {
                            // Gambar dua tunas yang lebih besar sebagai representasi daun tumbuh
                            this.ctx.drawImage(this.images['cropSprout'], -24, -40, 48, 48);
                        }
                        
                        // Batang daun melengkung
                        this.ctx.strokeStyle = cnf.colorStage2;
                        this.ctx.lineWidth = 4;
                        this.ctx.lineCap = 'round';
                        this.ctx.beginPath();
                        this.ctx.moveTo(0, 0);
                        this.ctx.quadraticCurveTo(-15, -20, -10, -35);
                        this.ctx.moveTo(0, 0);
                        this.ctx.quadraticCurveTo(15, -15, 20, -30);
                        this.ctx.stroke();

                    } else if (progress < 1.0) {
                        // Tahap 3: Hampir Matang
                        // Daun rimbun
                        this.ctx.fillStyle = cnf.colorStage2;
                        this.ctx.beginPath();
                        this.ctx.arc(-10, -25, 12, 0, Math.PI * 2);
                        this.ctx.arc(10, -20, 14, 0, Math.PI * 2);
                        this.ctx.arc(0, -35, 16, 0, Math.PI * 2);
                        this.ctx.fill();
                        
                        this.ctx.fillStyle = cnf.colorStage3;
                        this.ctx.beginPath();
                        this.ctx.arc(0, -40, 8, 0, Math.PI * 2);
                        this.ctx.fill();
                    } else {
                        // Tahap 4: MATANG (Siap Panen)
                        // Semak rimbun
                        this.ctx.fillStyle = cnf.colorStage2;
                        this.ctx.beginPath();
                        this.ctx.arc(-12, -25, 14, 0, Math.PI * 2);
                        this.ctx.arc(12, -20, 16, 0, Math.PI * 2);
                        this.ctx.arc(0, -35, 18, 0, Math.PI * 2);
                        this.ctx.fill();
                        
                        // Gambar ikon panen (Buah) yang melayang sedikit
                        const floatY = Math.sin(Date.now() / 300 + c) * 4;
                        const cropImg = this.images['crop_' + crop.type]; 
                        
                        if (cropImg) {
                            // Gambar ikon hasil panen ukuran besar di atas tanaman
                            this.ctx.drawImage(cropImg, -20, -50 + floatY, 40, 40);
                        } else {
                            this.ctx.fillStyle = cnf.colorStage3;
                            this.ctx.fillRect(-15, -50 + floatY, 30, 30);
                        }
                        
                        // Efek kilatan matang (Flash)
                        if (Math.sin(Date.now() / 200) > 0.4) {
                            this.ctx.fillStyle = 'rgba(255,255,255,0.3)';
                            this.ctx.beginPath();
                            this.ctx.arc(0, -30, 20, 0, Math.PI * 2);
                            this.ctx.fill();
                        }
                    }
                    this.ctx.restore();

                    // Partikel Kilau Retro Mengambang (Floating Sparkles) untuk tanaman MATANG
                    if (crop.progress >= 1.0) {
                        const timeSeed = Date.now() / 250 + c * 5 + r * 9;
                        for (let i = 0; i < 2; i++) {
                            const floatUp = ((timeSeed * 10 + i * 20) % 24);
                            const sparkleX = px + 10 + ((timeSeed * 16 + i * 35) % (ts - 20));
                            const sparkleY = py + ts - 18 - floatUp;
                            const size = 1.5 + Math.abs(Math.sin(timeSeed + i * Math.PI)) * 2;
                            this.ctx.fillStyle = `rgba(255, 235, 59, ${0.45 - (floatUp / 24) * 0.45})`; 
                            this.ctx.fillRect(sparkleX, sparkleY, size, size);
                        }
                    }

                    // Progress bar kecil bawah petak
                    this.ctx.fillStyle = 'rgba(0,0,0,0.6)';
                    this.ctx.fillRect(px + 6, py + ts - 9, ts - 12, 6);
                    const barColor = crop.watered ? '#4caf50' : '#ffa726';
                    this.ctx.fillStyle = barColor;
                    this.ctx.fillRect(px + 6, py + ts - 9, (ts - 12) * crop.progress, 6);
                    // Icon status

                    this.ctx.fillStyle = crop.watered ? '#81c784' : '#ffcc02';
                    this.ctx.fillRect(px + 3, py + ts - 9, 3, 6);
                }

                // =====================================================
                // STEP 4: Highlight tile di depan pemain
                // =====================================================

                if (this.selectedGridCell && this.selectedGridCell.x === c && this.selectedGridCell.y === r) {
                    const pulse = 0.5 + 0.3 * Math.sin(Date.now() / 200);
                    this.ctx.strokeStyle = `rgba(255, 230, 0, ${pulse})`;
                    this.ctx.lineWidth = 4;
                    this.ctx.strokeRect(px + 2, py + 2, ts - 4, ts - 4);
                    this.ctx.fillStyle = `rgba(255, 230, 0, 0.12)`;
                    this.ctx.fillRect(px + 2, py + 2, ts - 4, ts - 4);
                }

                // =====================================================
                // STEP 5: Border tipis antara semua tile (grid lines)
                // =====================================================
                this.ctx.strokeStyle = 'rgba(0,0,0,0.10)';
                this.ctx.lineWidth = 1;
                this.ctx.strokeRect(px, py, ts, ts);
            }
        }

        // Pagar pembatas area sawah (Wooden Log Garden Bed Border)
        this.ctx.save();
        const borderX = 4 * this.tileSize;
        const borderY = 3 * this.tileSize;
        const borderW = 4 * this.tileSize;
        const borderH = 3 * this.tileSize;

        // Gambar log kayu horizontal atas dan bawah
        this.ctx.fillStyle = '#5d4037'; // Cokelat kayu gelap
        this.ctx.fillRect(borderX - 4, borderY - 6, borderW + 8, 6); // Kayu atas
        this.ctx.fillRect(borderX - 4, borderY + borderH, borderW + 8, 6); // Kayu bawah

        // Gambar log kayu vertikal kiri dan kanan
        this.ctx.fillRect(borderX - 6, borderY - 4, 6, borderH + 8); // Kayu kiri
        this.ctx.fillRect(borderX + borderW, borderY - 4, 6, borderH + 8); // Kayu kanan

        // Detail highlight kayu agar 3D pixel art
        this.ctx.fillStyle = '#8d6e63'; // Cokelat kayu terang
        this.ctx.fillRect(borderX - 3, borderY - 5, borderW + 6, 2);
        this.ctx.fillRect(borderX - 3, borderY + borderH + 1, borderW + 6, 2);
        this.ctx.fillRect(borderX - 5, borderY - 3, 2, borderH + 6);
        this.ctx.fillRect(borderX + borderW + 1, borderY - 3, 2, borderH + 6);

        // Gambar tiang pojokan kayu bulat di keempat sudut
        const posts = [
            { x: borderX - 8, y: borderY - 8 },
            { x: borderX + borderW, y: borderY - 8 },
            { x: borderX - 8, y: borderY + borderH },
            { x: borderX + borderW, y: borderY + borderH }
        ];
        posts.forEach(post => {
            this.ctx.fillStyle = '#3e2723';
            this.ctx.fillRect(post.x, post.y, 8, 8); // Tiang utama
            this.ctx.fillStyle = '#c7a75c'; // Kepala tiang emas retro
            this.ctx.fillRect(post.x + 1, post.y + 1, 6, 6);
            this.ctx.fillStyle = '#ffffff'; // Kilau
            this.ctx.fillRect(post.x + 2, post.y + 2, 2, 2);
        });
        this.ctx.restore();

        // B. Gambar Feedback Animasi Aksi (Efek visual saat cangkul/siram)

        this.renderActionFeedback();


        // C. DRAW PLAYER (PETANI FANTASI BERTOPI CAPING DENGAN ANIMASI PREMIUM)
        let drawX = this.player.x * this.tileSize;
        let drawY = this.player.y * this.tileSize;
        let scaleX = 1;
        let scaleY = 1;
        let rotation = 0;
        let offsetY = 0;

        if (this.player.isMoving && this.player.moveStartTime) {
            const elapsed = Date.now() - this.player.moveStartTime;
            const duration = 150; // milidetik
            const progress = Math.min(elapsed / duration, 1);
            
            // Hitung koordinat grid asal
            let oldGridX = this.player.x;
            let oldGridY = this.player.y;
            if (this.player.direction === 'up') oldGridY++;
            if (this.player.direction === 'down') oldGridY--;
            if (this.player.direction === 'left') oldGridX++;
            if (this.player.direction === 'right') oldGridX--;

            const oldPx = oldGridX * this.tileSize;
            const oldPy = oldGridY * this.tileSize;
            const targetPx = this.player.x * this.tileSize;
            const targetPy = this.player.y * this.tileSize;

            // Interpolasi Linear (Lerp) posisi berjalan agar transisi mulus
            drawX = oldPx + (targetPx - oldPx) * progress;
            drawY = oldPy + (targetPy - oldPy) * progress;

            // Animasi langkah melompat kecil (bobbing)
            offsetY = -Math.abs(Math.sin(progress * Math.PI)) * 6;
            
            // Animasi miring kiri-kanan tipis (tilt)
            rotation = 0.08 * Math.sin(progress * Math.PI * 2);
        } else {
            // Animasi bernapas perlahan saat diam (Breathing Idle squash & stretch)
            const breathe = Math.sin(Date.now() / 320);
            scaleY = 1 + breathe * 0.035;
            scaleX = 1 - breathe * 0.015;
            offsetY = -breathe * 0.8; // Penyesuaian pivot bawah
        }

        // Terapkan matriks transformasi pada Canvas untuk animasi karakter yang sangat hidup
        this.ctx.save();
        
        // Atur titik pusat rotasi dan skala ke bagian bawah tengah sprite agar menapak tanah secara natural
        const pivotX = drawX + this.tileSize / 2;
        const pivotY = drawY + this.tileSize;
        
        this.ctx.translate(pivotX, pivotY);
        this.ctx.rotate(rotation);
        this.ctx.scale(scaleX, scaleY);
        
        // Arah hadap (Flipping horizontal jika menghadap ke kiri)
        if (this.player.direction === 'left') {
            this.ctx.scale(-1, 1);
        }

        // Gambar sprite petani di koordinat lokal (offset pivot)
        const localX = -this.tileSize / 2;
        const localY = -this.tileSize + offsetY;

        if (this.images.player) {
            this.ctx.drawImage(this.images.player, localX, localY, this.tileSize, this.tileSize);
        } else {
            // Fallback gambar petani manual bertopi caping yang retro dan lucu
            // Tubuh (Baju Biru)
            this.ctx.fillStyle = '#1e88e5';
            this.ctx.fillRect(localX + 20, localY + 26, 24, 22);
            // Kaki (Celana Gelap)
            this.ctx.fillStyle = '#3e2723';
            this.ctx.fillRect(localX + 22, localY + 48, 8, 8);
            this.ctx.fillRect(localX + 34, localY + 48, 8, 8);
            // Wajah
            this.ctx.fillStyle = '#ffcc80';
            this.ctx.fillRect(localX + 22, localY + 14, 20, 14);
            // Topi Caping Gunung Tradisional (Kuning Emas Kerucut)
            this.ctx.fillStyle = '#ffa000';
            this.ctx.beginPath();
            this.ctx.moveTo(localX + 8, localY + 14);
            this.ctx.lineTo(localX + 32, localY + 0);
            this.ctx.lineTo(localX + 56, localY + 14);
            this.ctx.fill();
            // Tepi topi
            this.ctx.strokeStyle = '#e65100';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(localX + 8, localY + 13, 48, 2);
        }
        
        this.ctx.restore();

    }

    // Fungsi untuk menggambar feedback animasi aksi (partikel, kilap)
    renderActionFeedback() {
        if (!this.actionFeedbacks) return;
        const now = Date.now();
        this.actionFeedbacks = this.actionFeedbacks.filter(fb => {
            const elapsed = now - fb.startTime;
            if (elapsed > fb.duration) return false;
            const progress = elapsed / fb.duration;
            const alpha = 1 - progress;
            const scale = 0.5 + progress * 1.5;
            const px = fb.x * this.tileSize + this.tileSize / 2;
            const py = fb.y * this.tileSize + this.tileSize / 2 - progress * 30;

            this.ctx.save();
            this.ctx.globalAlpha = alpha;
            this.ctx.font = `${Math.floor(this.tileSize * 0.4 * scale)}px serif`;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(fb.emoji, px, py);
            this.ctx.restore();
            return true;
        });
    }

    // Tambahkan feedback visual animasi emoji saat aksi
    addActionFeedback(gridX, gridY, emoji, duration = 900) {
        if (!this.actionFeedbacks) this.actionFeedbacks = [];
        this.actionFeedbacks.push({
            x: gridX, y: gridY, emoji,
            startTime: Date.now(),
            duration
        });
    }

    // Scale canvas agar selalu pas memenuhi layar (landscape)
    scaleCanvas() {
        const container = this.canvas.parentElement;
        if (!container) return;
        const containerW = container.clientWidth;
        const containerH = container.clientHeight;
        const scaleX = containerW / this.canvas.width;
        const scaleY = containerH / this.canvas.height;
        const scale = Math.min(scaleX, scaleY);
        this.canvas.style.width = `${this.canvas.width * scale}px`;
        this.canvas.style.height = `${this.canvas.height * scale}px`;
    }

    // --- 12. SCREEN & MODAL MANAGER ---
    startGame() {
        // Mulai permainan secara instan (gambar sudah ter-preload saat startup)
        this.state.screen = 'playing';
        document.getElementById('main-menu-screen').style.display = 'none';
        document.getElementById('game-screen').style.display = 'block';
        
        this.updateHUD();
        this.updateSelectedCell();
        audioManager.playBGM('bgm_game'); // Putar BGM Kebun
    }

    openModal(id) {
        document.getElementById(id).classList.remove('hidden');
    }

    closeModal(id) {
        document.getElementById(id).classList.add('hidden');
    }

    // --- 13. UI TOKO DESA ---
    openShopModal() {
        this.openModal('modal-toko');
        const container = document.getElementById('shop-items-container');
        document.getElementById('shop-cash-val').innerText = `Rp ${this.formatNumber(this.state.cash)}`;
        
        container.innerHTML = '';

        Object.keys(CROPS_CONFIG).forEach(key => {
            const config = CROPS_CONFIG[key];
            const isUnlocked = this.state.level >= config.unlockedAt;

            const card = document.createElement('div');
            card.className = 'shop-item-card';
            if (!isUnlocked) card.style.opacity = '0.5';

            const seedKey = `seed_${key}`;
            const imgDataURL = this.imagesDataURL[seedKey] || '';

            card.innerHTML = `
                <div class="shop-item-info">
                    <div class="shop-item-icon" style="background: transparent; border: none; box-shadow: none;">
                        <img src="${imgDataURL}" style="width: 32px; height: 32px; image-rendering: pixelated; object-fit: contain;">
                    </div>
                    <div class="shop-item-details">
                        <h4>Bibit ${config.name} ${!isUnlocked ? `(Lvl ${config.unlockedAt})` : ''}</h4>
                        <p>Rp ${this.formatNumber(config.seedPrice)}</p>
                        <div class="crop-time">⏱️ Tumbuh: ${config.growTime} detik</div>
                    </div>
                </div>
                <button class="btn-retro" ${!isUnlocked ? 'disabled' : ''} id="btn-buy-${key}">BELI</button>
            `;

            container.appendChild(card);


            if (isUnlocked) {
                document.getElementById(`btn-buy-${key}`).addEventListener('click', () => {
                    this.buySeed(key);
                });
            }
        });
    }

    buySeed(cropType) {
        const config = CROPS_CONFIG[cropType];
        if (this.state.cash < config.seedPrice) {
            audioManager.playSFX('sfx_click');
            this.showNotification("❌ Uang Kas Anda tidak cukup!");
            return;
        }

        audioManager.playSFX('sfx_click');
        this.state.cash -= config.seedPrice;
        this.state.inventory[`seed_${cropType}`]++;
        
        document.getElementById('shop-cash-val').innerText = `Rp ${this.formatNumber(this.state.cash)}`;
        this.updateHUD();
        this.showNotification(`🛒 Beli 1 Bibit ${config.name} berhasil!`);
        this.saveGame();
    }

    // --- 14. UI TAS SAYA (INVENTORI) ---
    openInventoryModal(plantingMode = false) {
        this.openModal('modal-tas');
        const container = document.getElementById('inventory-grid-container');
        container.innerHTML = '';

        // Reset detail panel
        document.getElementById('detail-icon-container').innerHTML = '';
        document.getElementById('detail-title').innerText = 'Pilih Item';
        document.getElementById('detail-desc').innerText = 'Pilih salah satu item di tas untuk melihat detail atau fungsinya.';
        document.getElementById('detail-actions').innerHTML = '';

        let firstSlot = null;

        // Render alat tani bawaan (Cangkul & Penyiram) yang tak terbatas menggunakan ikon gambar premium
        const tools = [
            { 
                id: 'tool_cangkul', 
                name: 'Cangkul', 
                icon: `<img src="${this.imagesDataURL.tool_cangkul || ''}" style="width: 32px; height: 32px; image-rendering: pixelated; object-fit: contain;">`, 
                desc: 'Digunakan untuk mencangkul rumput liar menjadi lahan siap tanam.' 
            },
            { 
                id: 'tool_siram', 
                name: 'Penyiram Air', 
                icon: `<img src="${this.imagesDataURL.tool_siram || ''}" style="width: 32px; height: 32px; image-rendering: pixelated; object-fit: contain;">`, 
                desc: 'Menyiram lahan agar basah sehingga bibit bisa tumbuh subur.' 
            }
        ];

        tools.forEach(tool => {
            const slot = document.createElement('div');
            slot.className = 'inventory-slot';
            slot.innerHTML = `${tool.icon} <span class="slot-qty">∞</span>`;
            
            slot.addEventListener('click', () => {
                this.selectInventoryItem(slot, tool, false, plantingMode);
            });
            container.appendChild(slot);
        });

        // Render bibit & hasil tani yang dimiliki
        Object.keys(this.state.inventory).forEach(key => {
            const qty = this.state.inventory[key];
            if (qty <= 0) return; // Sembunyikan item kosong

            let name = "";
            let icon = "";
            let desc = "";
            let isSeed = key.startsWith('seed_');
            const imgDataURL = this.imagesDataURL[key] || '';

            if (isSeed) {
                const cropKey = key.replace('seed_', '');
                name = `Bibit ${CROPS_CONFIG[cropKey].name}`;
                icon = `<img src="${imgDataURL}" style="width: 32px; height: 32px; image-rendering: pixelated; object-fit: contain;">`;
                desc = `Benih siap ditanam di petak tanah yang dicangkul. Butuh ${CROPS_CONFIG[cropKey].growTime} detik untuk siap panen.`;
            } else {
                const cropKey = key.replace('crop_', '');
                name = `Hasil ${CROPS_CONFIG[cropKey].name}`;
                icon = `<img src="${imgDataURL}" style="width: 32px; height: 32px; image-rendering: pixelated; object-fit: contain;">`;
                desc = `Hasil panen segar ${CROPS_CONFIG[cropKey].name}. Dapat dijual ke pasar desa atau pasar ekspor untuk untung besar!`;
            }

            const itemObj = { id: key, name, icon, desc, qty, isSeed };

            const slot = document.createElement('div');
            slot.className = 'inventory-slot';
            slot.innerHTML = `${icon} <span class="slot-qty">${qty}</span>`;

            slot.addEventListener('click', () => {
                this.selectInventoryItem(slot, itemObj, true, plantingMode);
            });
            container.appendChild(slot);

            if (!firstSlot) firstSlot = { slot, itemObj };
        });

        // Pilih item pertama secara otomatis jika ada
        if (firstSlot) {
            this.selectInventoryItem(firstSlot.slot, firstSlot.itemObj, true, plantingMode);
        }
    }

    selectInventoryItem(slotEl, item, isOwnable, plantingMode) {
        // Hapus kelas terpilih dari slot lain
        const slots = document.querySelectorAll('.inventory-slot');
        slots.forEach(s => s.classList.remove('selected'));
        
        slotEl.classList.add('selected');
        
        // Perbarui detail item
        document.getElementById('detail-icon-container').innerHTML = item.icon;

        document.getElementById('detail-title').innerText = item.name;
        document.getElementById('detail-desc').innerText = item.desc;

        const actionArea = document.getElementById('detail-actions');
        actionArea.innerHTML = '';

        if (plantingMode && item.isSeed && isOwnable) {
            const btnTanam = document.createElement('button');
            btnTanam.className = 'btn-retro';
            btnTanam.innerText = 'TANAM DI LAHAN';
            btnTanam.style.width = '100%';
            btnTanam.addEventListener('click', () => {
                const cropKey = item.id.replace('seed_', '');
                this.plantCrop(cropKey);
            });
            actionArea.appendChild(btnTanam);
        }
    }

    // --- 15. UI PASAR DESA & SILO ---
    openPasarModal(isExport = false) {
        this.openModal('modal-pasar');
        
        const title = document.getElementById('pasar-title');
        const multiplierText = document.getElementById('pasar-multiplier-text');
        const container = document.getElementById('market-items-container');

        const multiplier = isExport ? 1.5 : 1.0;

        title.innerText = isExport ? "🚢 TOKO EKSPOR DESA" : "⚖️ LUMBUNG SILO & PASAR";
        multiplierText.innerText = isExport ? "Harga Jual Premium: Ekspor Luar Negeri (1.5x Lipat!)" : `Kapasitas Silo Anda: ${this.getSiloUsedSpace()}/${this.state.siloCapacity} Hasil Panen`;

        container.innerHTML = '';

        // Tampilkan daftar hasil panen yang bisa dijual
        let totalCrops = 0;

        Object.keys(CROPS_CONFIG).forEach(key => {
            const config = CROPS_CONFIG[key];
            const qty = this.state.inventory[`crop_${key}`];
            
            if (qty > 0) {
                totalCrops += qty;
                const unitPrice = Math.floor(config.sellPrice * multiplier);
                const totalPrice = unitPrice * qty;

                const cropKey = `crop_${key}`;
                const imgDataURL = this.imagesDataURL[cropKey] || '';

                const card = document.createElement('div');
                card.className = 'market-item-card';
                card.innerHTML = `
                    <div class="shop-item-info">
                        <div class="shop-item-icon" style="background: transparent; border: none; box-shadow: none;">
                            <img src="${imgDataURL}" style="width: 32px; height: 32px; image-rendering: pixelated; object-fit: contain;">
                        </div>
                        <div class="shop-item-details">
                            <h4>${config.name} (${qty} buah)</h4>
                            <p>Harga: Rp ${this.formatNumber(unitPrice)}/pcs</p>
                        </div>
                    </div>
                    <button class="btn-retro" id="btn-sell-${key}">JUAL Rp ${this.formatNumber(totalPrice)}</button>
                `;
                container.appendChild(card);


                document.getElementById(`btn-sell-${key}`).addEventListener('click', () => {
                    this.sellCrop(key, isExport);
                });
            }
        });

        // Opsi Upgrade Silo jika di pasar biasa (bukan ekspor)
        if (!isExport) {
            const cardUpgrade = document.createElement('div');
            cardUpgrade.className = 'market-item-card';
            cardUpgrade.style.border = '3px solid var(--morning-gold)';
            
            const nextCapacity = this.state.siloCapacity * 2;
            const upgradeCost = this.state.siloCapacity === 15 ? 250000 : 1000000;
            const maxReached = this.state.siloCapacity >= 60;

            if (maxReached) {
                cardUpgrade.innerHTML = `
                    <div class="shop-item-info">
                        <div class="shop-item-icon">${SVG_ICONS.silo}</div>
                        <div class="shop-item-details">
                            <h4>Kapasitas Silo Maksimal</h4>
                            <p>Silo Level MAX (${this.state.siloCapacity} Slot)</p>
                        </div>
                    </div>
                `;
            } else {
                cardUpgrade.innerHTML = `
                    <div class="shop-item-info">
                        <div class="shop-item-icon">
                            ${SVG_ICONS.silo}
                        </div>
                        <div class="shop-item-details">
                            <h4>Upgrade Kapasitas Silo (${nextCapacity} Slot)</h4>
                            <p>Harga: Rp ${this.formatNumber(upgradeCost)}</p>
                        </div>
                    </div>
                    <button class="btn-retro" id="btn-upgrade-silo">UPGRADE</button>
                `;
            }

            container.appendChild(cardUpgrade);

            if (!maxReached) {
                document.getElementById('btn-upgrade-silo').addEventListener('click', () => {
                    this.upgradeSilo(upgradeCost, nextCapacity);
                });
            }
        }

        if (totalCrops === 0) {
            const emptyMsg = document.createElement('p');
            emptyMsg.style.textAlign = 'center';
            emptyMsg.style.padding = '20px';
            emptyMsg.style.color = '#b0bec5';
            emptyMsg.innerText = "Tidak ada hasil tani di gudang yang bisa dijual saat ini.";
            container.prepend(emptyMsg);
            document.getElementById('btn-jual-semua').style.display = 'none';
        } else {
            document.getElementById('btn-jual-semua').style.display = 'block';
        }
    }

    getSiloUsedSpace() {
        return Object.keys(this.state.inventory)
            .filter(key => key.startsWith('crop_'))
            .reduce((sum, key) => sum + this.state.inventory[key], 0);
    }

    sellCrop(cropKey, isExport = false) {
        const qty = this.state.inventory[`crop_${cropKey}`];
        if (qty <= 0) return;

        const config = CROPS_CONFIG[cropKey];
        const exportBonus = isExport ? 1.5 : 1.0;
        const chapterBonus = (this.state.story && this.state.story.chapter >= 2) ? 1.2 : 1.0;
        const multiplier = exportBonus * chapterBonus;
        const totalEarnings = Math.floor(config.sellPrice * multiplier) * qty;

        audioManager.playSFX('sfx_click');
        this.state.cash += totalEarnings;
        this.state.inventory[`crop_${cropKey}`] = 0;

        this.updateHUD();
        this.showNotification(`💰 Terjual ${qty} ${config.name}! Untung Rp ${this.formatNumber(totalEarnings)}!`);
        this.closeModal('modal-pasar');
        this.saveGame();
    }

    sellAllCrops() {
        let totalEarnings = 0;
        let itemsCount = 0;
        const isExportContext = this.state.hasExportShop && this.selectedGridCell && this.selectedGridCell.type === 'export';
        const exportBonus = isExportContext ? 1.5 : 1.0;
        const chapterBonus = (this.state.story && this.state.story.chapter >= 2) ? 1.2 : 1.0;
        const multiplier = exportBonus * chapterBonus;

        Object.keys(CROPS_CONFIG).forEach(key => {
            const qty = this.state.inventory[`crop_${key}`];
            if (qty > 0) {
                const config = CROPS_CONFIG[key];
                totalEarnings += Math.floor(config.sellPrice * multiplier) * qty;
                itemsCount += qty;
                this.state.inventory[`crop_${key}`] = 0;
            }
        });

        if (itemsCount === 0) return;

        audioManager.playSFX('sfx_click');
        this.state.cash += totalEarnings;
        this.updateHUD();
        this.showNotification(`💰 Jual semua panen berhasil! Rp ${this.formatNumber(totalEarnings)} masuk kas!`);
        this.closeModal('modal-pasar');
        this.saveGame();
    }

    upgradeSilo(cost, nextCap) {
        if (this.state.cash < cost) {
            audioManager.playSFX('sfx_click');
            this.showNotification("❌ Uang Kas Anda tidak mencukupi untuk upgrade!");
            return;
        }

        audioManager.playSFX('sfx_click');
        this.state.cash -= cost;
        this.state.siloCapacity = nextCap;
        this.state.siloUpgrades++;

        this.updateHUD();
        this.showNotification(`🏠 Lumbung Silo diperluas menjadi kapasitas ${nextCap} slot!`);
        this.closeModal('modal-pasar');
        this.saveGame();
    }

    // --- 16. LAYAR BANGUN INFRASTRUKTUR BARU ---
    openBuildingBuildOverlay(type) {
        let cost = 0;
        let title = "";
        let desc = "";

        if (type === 'well') {
            cost = 75000;
            title = "Sumur Otomatis";
            desc = "Memasang pompa air otomatis di sumur agar dapat menyiram tanaman lebih cepat. Mengurangi durasi tumbuh seluruh tanaman sebesar 20%.";
        } else if (type === 'export') {
            cost = 250000;
            title = "Toko Ekspor Internasional";
            desc = "Membuka jalur penjualan ekspor internasional ke luar negeri. Semua hasil tani yang dijual di bangunan ini mendapatkan harga premium 1.5x lipat dari pasar biasa!";
        }

        if (confirm(`Apakah Anda ingin membangun ${title} seharga Rp ${this.formatNumber(cost)}? \n\nDeskripsi: ${desc}`)) {
            if (this.state.cash < cost) {
                audioManager.playSFX('sfx_click');
                this.showNotification("❌ Uang Kas Anda tidak cukup untuk pembangunan!");
                return;
            }

            audioManager.playSFX('sfx_click');
            this.state.cash -= cost;

            if (type === 'well') {
                this.state.hasAutoWell = true;
                this.showNotification("💧 Sumur Otomatis berhasil dibangun! Kecepatan tumbuh tanaman +20%.");
            } else if (type === 'export') {
                this.state.hasExportShop = true;
                this.showNotification("🚢 Toko Ekspor Internasional dibangun! Buka transaksi premium 1.5x.");
            }

            this.updateHUD();
            this.updateSelectedCell();
            this.saveGame();
        }
    }

    openSlotsModal(mode) {
        this.slotMode = mode;
        const titleEl = document.getElementById('slots-title');
        if (mode === 'load') {
            titleEl.innerText = "📂 MUAT DATA PERMAINAN";
        } else if (mode === 'save') {
            titleEl.innerText = "💾 SIMPAN DATA PERMAINAN";
        } else if (mode === 'new_game') {
            titleEl.innerText = "🎮 MULAI GAME BARU (PILIH SLOT)";
        }

        // Tampilkan info detail tiap slot
        for (let i = 1; i <= 3; i++) {
            const raw = localStorage.getItem(`wirausahaTaniSave_slot${i}`);
            const infoEl = document.getElementById(`slot-${i}-info`);
            const cardEl = document.getElementById(`slot-card-${i}`);
            
            if (raw) {
                try {
                    const save = JSON.parse(raw);
                    const formattedCash = this.formatNumber(save.cash);
                    const dateStr = save.saveTime ? new Date(save.saveTime).toLocaleString('id-ID', { hour12: false }) : 'Waktu tidak tercatat';
                    infoEl.innerHTML = `📅 Hari Ke: <strong>${save.day}</strong> | 🌟 Level: <strong>${save.level}</strong> | 💰 Kas: <strong>Rp ${formattedCash}</strong><br><span style="font-size: 9px; opacity: 0.65;">Disimpan: ${dateStr}</span>`;
                    cardEl.style.opacity = '1';
                } catch (e) {
                    infoEl.innerText = "[DATA RUSAK]";
                    cardEl.style.opacity = '0.7';
                }
            } else {
                if (mode === 'load') {
                    infoEl.innerText = "[SLOT KOSONG]";
                    cardEl.style.opacity = '0.5';
                } else if (mode === 'new_game') {
                    infoEl.innerText = "[SLOT KOSONG - KLIK UNTUK MEMULAI GAME BARU DI SINI]";
                    cardEl.style.opacity = '1';
                } else {
                    infoEl.innerText = "[SLOT KOSONG - KLIK UNTUK MENYIMPAN DI SINI]";
                    cardEl.style.opacity = '1';
                }
            }
        }

        document.getElementById('slots-screen').classList.remove('hidden');
    }

    handleSlotClick(slot) {
        const raw = localStorage.getItem(`wirausahaTaniSave_slot${slot}`);
        
        if (this.slotMode === 'load') {
            if (!raw) {
                this.showNotification("❌ Slot kosong! Silakan pilih slot yang berisi data.");
                return;
            }
            this.loadGame(slot);
            document.getElementById('slots-screen').classList.add('hidden');
            this.startGame();
            this.showNotification(`📂 Game Slot ${slot} berhasil dimuat!`);
        } 
        else if (this.slotMode === 'save') {
            if (raw) {
                try {
                    const save = JSON.parse(raw);
                    if (!confirm(`Slot ${slot} sudah berisi data (Hari ke-${save.day}). Apakah Anda ingin menimpanya?`)) {
                        return;
                    }
                } catch (e) {}
            }
            this.saveGame(slot);
            document.getElementById('slots-screen').classList.add('hidden');
            document.getElementById('pause-menu-overlay').classList.add('hidden');
            this.state.isPaused = false;
            this.showNotification(`💾 Progres berhasil disimpan di Slot ${slot}!`);
        } 
        else if (this.slotMode === 'new_game') {
            if (raw) {
                try {
                    const save = JSON.parse(raw);
                    if (!confirm(`Slot ${slot} sudah berisi data (Hari ke-${save.day}). Mulai baru dan HAPUS data lama?`)) {
                        return;
                    }
                } catch (e) {}
            }
            this.resetSave(slot);
            document.getElementById('slots-screen').classList.add('hidden');
            this.startGame();
            this.showNotification(`🎮 Game baru dimulai pada Slot ${slot}!`);
        }
    }
    loadHUDSettings() {
        try {
            const raw = localStorage.getItem('wirausahaTaniHUDSettings');
            if (raw) {
                this.hudSettings = JSON.parse(raw);
            }
        } catch (e) {
            console.warn('[loadHUDSettings] Gagal membaca settings:', e);
        }
        this.applyHUDSettings();
    }

    applyHUDSettings() {
        const dpadEl = document.getElementById('dpad');
        const analogEl = document.getElementById('analog-joystick');
        const actionsEl = document.getElementById('action-buttons');
        
        if (!dpadEl || !analogEl || !actionsEl) return;

        // Terapkan tipe kontrol
        if (this.hudSettings.type === 'analog') {
            dpadEl.classList.add('hidden');
            analogEl.classList.remove('hidden');
        } else {
            dpadEl.classList.remove('hidden');
            analogEl.classList.add('hidden');
        }

        // Terapkan skala & transparansi
        const scale = this.hudSettings.scale ?? 1.0;
        const opacity = this.hudSettings.opacity ?? 0.9;

        [dpadEl, analogEl, actionsEl].forEach(el => {
            el.style.transform = `scale(${scale})`;
            el.style.opacity = opacity;
        });

        // Terapkan posisi
        const pos = this.hudSettings.positions || {};
        if (pos.dpad) {
            dpadEl.style.left = pos.dpad.left || '25px';
            dpadEl.style.top = pos.dpad.top || 'auto';
            dpadEl.style.bottom = pos.dpad.bottom || '25px';
            dpadEl.style.right = pos.dpad.right || 'auto';
        } else {
            dpadEl.style.left = ''; dpadEl.style.top = ''; dpadEl.style.bottom = ''; dpadEl.style.right = '';
        }

        if (pos.analog) {
            analogEl.style.left = pos.analog.left || '25px';
            analogEl.style.top = pos.analog.top || 'auto';
            analogEl.style.bottom = pos.analog.bottom || '25px';
            analogEl.style.right = pos.analog.right || 'auto';
        } else {
            analogEl.style.left = ''; analogEl.style.top = ''; analogEl.style.bottom = ''; analogEl.style.right = '';
        }

        if (pos.actions) {
            actionsEl.style.left = pos.actions.left || 'auto';
            actionsEl.style.top = pos.actions.top || 'auto';
            actionsEl.style.bottom = pos.actions.bottom || '25px';
            actionsEl.style.right = pos.actions.right || '25px';
        } else {
            actionsEl.style.left = ''; actionsEl.style.top = ''; actionsEl.style.bottom = ''; actionsEl.style.right = '';
        }
    }

    initMuteSetting() {
        try {
            const rawMute = localStorage.getItem('wirausahaTaniMute');
            const isMuted = rawMute === 'true';
            audioManager.muteAll(isMuted);
            
            // Set state checkbox BGM (aktif jika tidak dimute)
            const checkMute = document.getElementById('check-mute');
            if (checkMute) {
                checkMute.checked = !isMuted;
            }
        } catch (e) {
            console.warn('[initMuteSetting] Gagal membaca mute setting:', e);
        }
    }

    startEditHUD() {
        this.isEditingHUD = true;
        this.state.isPaused = true; // Jeda permainan saat edit HUD

        this.tempHUDSettings = JSON.parse(JSON.stringify(this.hudSettings));

        // Tampilkan bar editor
        const editorBar = document.getElementById('hud-editor-bar');
        editorBar.classList.remove('hidden');

        // Terapkan class editing mode
        document.getElementById('game-screen').classList.add('hud-editing-mode');

        this.applyTempHUDSettings();

        // Sinkronisasi slider
        document.getElementById('slider-hud-scale').value = this.tempHUDSettings.scale ?? 1.0;
        document.getElementById('val-hud-scale').innerText = `${Math.round((this.tempHUDSettings.scale ?? 1.0) * 100)}%`;
        
        document.getElementById('slider-hud-opacity').value = this.tempHUDSettings.opacity ?? 0.9;
        document.getElementById('val-hud-opacity').innerText = `${Math.round((this.tempHUDSettings.opacity ?? 0.9) * 100)}%`;

        // Sinkronisasi tombol tab tipe
        const btnDpad = document.getElementById('btn-editor-type-dpad');
        const btnAnalog = document.getElementById('btn-editor-type-analog');
        if (this.tempHUDSettings.type === 'analog') {
            btnDpad.classList.remove('active-tab');
            btnAnalog.classList.add('active-tab');
        } else {
            btnDpad.classList.add('active-tab');
            btnAnalog.classList.remove('active-tab');
        }
    }

    applyTempHUDSettings() {
        const dpadEl = document.getElementById('dpad');
        const analogEl = document.getElementById('analog-joystick');
        const actionsEl = document.getElementById('action-buttons');
        
        if (!dpadEl || !analogEl || !actionsEl) return;

        // Toggle visibilitas sesuai tipe aktif di editor
        if (this.tempHUDSettings.type === 'analog') {
            dpadEl.classList.add('hidden');
            analogEl.classList.remove('hidden');
        } else {
            dpadEl.classList.remove('hidden');
            analogEl.classList.add('hidden');
        }

        // Skala & Opacity
        const scale = this.tempHUDSettings.scale ?? 1.0;
        const opacity = this.tempHUDSettings.opacity ?? 0.9;
        [dpadEl, analogEl, actionsEl].forEach(el => {
            el.style.transform = `scale(${scale})`;
            el.style.opacity = opacity;
        });

        // Posisi
        const pos = this.tempHUDSettings.positions || {};
        
        if (pos.dpad) {
            dpadEl.style.left = pos.dpad.left;
            dpadEl.style.top = pos.dpad.top;
            dpadEl.style.bottom = pos.dpad.bottom;
            dpadEl.style.right = pos.dpad.right;
        } else {
            dpadEl.style.left = '25px'; dpadEl.style.bottom = '25px'; dpadEl.style.top = 'auto'; dpadEl.style.right = 'auto';
        }

        if (pos.analog) {
            analogEl.style.left = pos.analog.left;
            analogEl.style.top = pos.analog.top;
            analogEl.style.bottom = pos.analog.bottom;
            analogEl.style.right = pos.analog.right;
        } else {
            analogEl.style.left = '25px'; analogEl.style.bottom = '25px'; analogEl.style.top = 'auto'; analogEl.style.right = 'auto';
        }

        if (pos.actions) {
            actionsEl.style.left = pos.actions.left;
            actionsEl.style.top = pos.actions.top;
            actionsEl.style.bottom = pos.actions.bottom;
            actionsEl.style.right = pos.actions.right;
        } else {
            actionsEl.style.right = '25px'; actionsEl.style.bottom = '25px'; actionsEl.style.left = 'auto'; actionsEl.style.top = 'auto';
        }
    }

    setupHUDDragAndDrop() {
        const elements = [
            { id: 'dpad', key: 'dpad' },
            { id: 'analog-joystick', key: 'analog' },
            { id: 'action-buttons', key: 'actions' }
        ];

        elements.forEach(item => {
            const el = document.getElementById(item.id);
            if (!el) return;

            let isDragging = false;
            let startX = 0;
            let startY = 0;
            let startLeft = 0;
            let startTop = 0;

            const onPointerDown = (e) => {
                if (!this.isEditingHUD) return;
                e.preventDefault();
                isDragging = true;
                
                startX = e.clientX;
                startY = e.clientY;
                
                const parent = el.offsetParent || document.getElementById('game-screen');
                const parentRect = parent.getBoundingClientRect();
                const rect = el.getBoundingClientRect();
                
                startLeft = rect.left - parentRect.left;
                startTop = rect.top - parentRect.top;
                
                el.setPointerCapture(e.pointerId);
            };

            const onPointerMove = (e) => {
                if (!isDragging || !this.isEditingHUD) return;
                e.preventDefault();
                
                const deltaX = e.clientX - startX;
                const deltaY = e.clientY - startY;
                
                let newLeft = startLeft + deltaX;
                let newTop = startTop + deltaY;

                const parent = el.offsetParent || document.getElementById('game-screen');
                const parentW = parent.clientWidth;
                const parentH = parent.clientHeight;
                const rect = el.getBoundingClientRect();
                const w = rect.width;
                const h = rect.height;

                newLeft = Math.max(5, Math.min(parentW - w - 5, newLeft));
                newTop = Math.max(5, Math.min(parentH - h - 5, newTop));

                const leftPct = `${(newLeft / parentW) * 100}%`;
                const topPct = `${(newTop / parentH) * 100}%`;

                el.style.left = leftPct;
                el.style.top = topPct;
                el.style.right = 'auto';
                el.style.bottom = 'auto';

                if (!this.tempHUDSettings.positions) this.tempHUDSettings.positions = {};
                this.tempHUDSettings.positions[item.key] = {
                    left: leftPct,
                    top: topPct,
                    bottom: 'auto',
                    right: 'auto'
                };
            };

            const onPointerUp = (e) => {
                if (isDragging) {
                    isDragging = false;
                    try {
                        el.releasePointerCapture(e.pointerId);
                    } catch (err) {}
                }
            };

            el.addEventListener('pointerdown', onPointerDown);
            el.addEventListener('pointermove', onPointerMove);
            el.addEventListener('pointerup', onPointerUp);
            el.addEventListener('pointercancel', onPointerUp);
        });
    }

    setupHUDEditorListeners() {
        const btnDpad = document.getElementById('btn-editor-type-dpad');
        const btnAnalog = document.getElementById('btn-editor-type-analog');
        const sliderScale = document.getElementById('slider-hud-scale');
        const sliderOpacity = document.getElementById('slider-hud-opacity');
        const btnReset = document.getElementById('btn-editor-reset');
        const btnSave = document.getElementById('btn-editor-save');

        btnDpad.addEventListener('click', () => {
            audioManager.playSFX('sfx_click');
            this.tempHUDSettings.type = 'dpad';
            btnDpad.classList.add('active-tab');
            btnAnalog.classList.remove('active-tab');
            this.applyTempHUDSettings();
        });

        btnAnalog.addEventListener('click', () => {
            audioManager.playSFX('sfx_click');
            this.tempHUDSettings.type = 'analog';
            btnAnalog.classList.add('active-tab');
            btnDpad.classList.remove('active-tab');
            this.applyTempHUDSettings();
        });

        sliderScale.addEventListener('input', (e) => {
            const scale = parseFloat(e.target.value);
            this.tempHUDSettings.scale = scale;
            document.getElementById('val-hud-scale').innerText = `${Math.round(scale * 100)}%`;
            this.applyTempHUDSettings();
        });

        sliderOpacity.addEventListener('input', (e) => {
            const opacity = parseFloat(e.target.value);
            this.tempHUDSettings.opacity = opacity;
            document.getElementById('val-hud-opacity').innerText = `${Math.round(opacity * 100)}%`;
            this.applyTempHUDSettings();
        });

        btnReset.addEventListener('click', () => {
            audioManager.playSFX('sfx_click');
            if (confirm("Reset tata letak dan pengaturan kontrol ke default?")) {
                this.tempHUDSettings = {
                    type: 'dpad',
                    scale: 1.0,
                    opacity: 0.9,
                    positions: {}
                };
                
                sliderScale.value = 1.0;
                document.getElementById('val-hud-scale').innerText = '100%';
                sliderOpacity.value = 0.9;
                document.getElementById('val-hud-opacity').innerText = '90%';
                
                btnDpad.classList.add('active-tab');
                btnAnalog.classList.remove('active-tab');
                
                this.applyTempHUDSettings();
            }
        });

        // Tombol BATAL di editor HUD
        const btnCancel = document.getElementById('btn-editor-cancel');
        if (btnCancel) {
            btnCancel.addEventListener('click', () => {
                audioManager.playSFX('sfx_click');
                
                document.getElementById('hud-editor-bar').classList.add('hidden');
                document.getElementById('game-screen').classList.remove('hud-editing-mode');
                
                this.isEditingHUD = false;
                if (this.state) this.state.isPaused = false;

                // Kembalikan tata letak kontrol visual ke setingan tersimpan semula
                this.applyHUDSettings();

                if (this.isEditingHUDFromMainMenu) {
                    // Sembunyikan game-screen dan kembalikan ke menu utama
                    document.getElementById('game-screen').style.display = 'none';
                    const canvasContainer = document.getElementById('canvas-container');
                    if (canvasContainer) canvasContainer.style.visibility = '';
                    const hudTop = document.getElementById('hud-top');
                    if (hudTop) hudTop.style.visibility = '';
                    document.getElementById('game-screen').style.backgroundColor = '';

                    document.getElementById('main-menu-screen').style.display = 'flex';
                    document.getElementById('settings-screen').classList.remove('hidden');
                    this.isEditingHUDFromMainMenu = false;
                }
            });
        }

        btnSave.addEventListener('click', () => {
            audioManager.playSFX('sfx_click');
            
            this.hudSettings = JSON.parse(JSON.stringify(this.tempHUDSettings));
            try {
                localStorage.setItem('wirausahaTaniHUDSettings', JSON.stringify(this.hudSettings));
            } catch (e) {}

            document.getElementById('hud-editor-bar').classList.add('hidden');
            document.getElementById('game-screen').classList.remove('hud-editing-mode');
            
            this.isEditingHUD = false;
            if (this.state) this.state.isPaused = false;

            if (this.isEditingHUDFromMainMenu) {
                // Sembunyikan game-screen dan kembalikan ke menu utama
                document.getElementById('game-screen').style.display = 'none';
                const canvasContainer = document.getElementById('canvas-container');
                if (canvasContainer) canvasContainer.style.visibility = '';
                const hudTop = document.getElementById('hud-top');
                if (hudTop) hudTop.style.visibility = '';
                document.getElementById('game-screen').style.backgroundColor = '';

                document.getElementById('main-menu-screen').style.display = 'flex';
                document.getElementById('settings-screen').classList.remove('hidden');
                this.isEditingHUDFromMainMenu = false;
            } else {
                this.showNotification("💾 Layout kontrol HUD berhasil disimpan!");
            }
        });
    }

    setupAnalogJoystick() {
        const joystick = document.getElementById('analog-joystick');
        const knob = joystick.querySelector('.joystick-knob');
        const base = joystick.querySelector('.joystick-base');

        let isTouch = false;
        let baseRect = null;
        let centerX = 0;
        let centerY = 0;
        const maxRadius = 40;

        const onStart = (e) => {
            if (this.isEditingHUD || this.state.screen !== 'playing') return;
            isTouch = true;
            baseRect = base.getBoundingClientRect();
            centerX = baseRect.left + baseRect.width / 2;
            centerY = baseRect.top + baseRect.height / 2;

            if (e.pointerId) {
                try {
                    base.setPointerCapture(e.pointerId);
                } catch (err) {}
            }
            
            handleMove(e);
        };

        const handleMove = (e) => {
            if (!isTouch) return;
            
            const clientX = e.clientX;
            const clientY = e.clientY;
            
            let dx = clientX - centerX;
            let dy = clientY - centerY;
            
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist > maxRadius) {
                const angle = Math.atan2(dy, dx);
                dx = Math.cos(angle) * maxRadius;
                dy = Math.sin(angle) * maxRadius;
            }

            knob.style.transform = `translate(${dx}px, ${dy}px)`;

            const deadzone = 12;
            if (dist > deadzone) {
                const angleDeg = Math.atan2(dy, dx) * 180 / Math.PI;
                let dir = null;
                
                if (angleDeg >= -135 && angleDeg < -45) {
                    dir = 'up';
                } else if (angleDeg >= -45 && angleDeg < 45) {
                    dir = 'right';
                } else if (angleDeg >= 45 && angleDeg < 135) {
                    dir = 'down';
                } else {
                    dir = 'left';
                }

                if (dir && dir !== this.joystickDir) {
                    this.joystickDir = dir;
                    this.movePlayer(dir);
                    
                    if (this.joystickInterval) clearInterval(this.joystickInterval);
                    this.joystickInterval = setInterval(() => {
                        if (isTouch && this.joystickDir && !this.isEditingHUD) {
                            this.movePlayer(this.joystickDir);
                        }
                    }, 200);
                }
            } else {
                this.joystickDir = null;
                if (this.joystickInterval) {
                    clearInterval(this.joystickInterval);
                    this.joystickInterval = null;
                }
            }
        };

        const onEnd = (e) => {
            if (!isTouch) return;
            isTouch = false;
            this.joystickDir = null;
            
            if (this.joystickInterval) {
                clearInterval(this.joystickInterval);
                this.joystickInterval = null;
            }
            
            if (e.pointerId) {
                try {
                    base.releasePointerCapture(e.pointerId);
                } catch (err) {}
            }

            knob.style.transform = 'translate(0px, 0px)';
        };

        base.addEventListener('pointerdown', onStart);
        base.addEventListener('pointermove', handleMove);
        base.addEventListener('pointerup', onEnd);
        base.addEventListener('pointercancel', onEnd);
        base.addEventListener('pointerleave', onEnd);
    }
}

// Inisialisasi Game saat seluruh aset DOM siap
window.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    
    // Solusi Autoplay: pemicu audio saat ada interaksi pertama dari pengguna
    const startAudio = () => {
        if (!audioManager.isMuted) {
            if (audioManager.currentBGM) {
                audioManager.currentBGM.play().catch(e => console.log("[Autoplay BGM failed]", e));
            } else {
                audioManager.playBGM(game.state.screen === 'playing' ? 'bgm_game' : 'bgm_menu');
            }
        }
        window.removeEventListener('click', startAudio);
        window.removeEventListener('touchstart', startAudio);
        window.removeEventListener('keydown', startAudio);
    };
    
    window.addEventListener('click', startAudio);
    window.addEventListener('touchstart', startAudio);
    window.addEventListener('keydown', startAudio);
    
    // Coba jalankan pemutaran awal (jika dizinkan oleh browser/lingkungan desktop)
    audioManager.playBGM('bgm_menu');
});
