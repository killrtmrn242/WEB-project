document.addEventListener("DOMContentLoaded", function () { 
    // Инициализация переменных
    const loginLink = document.getElementById("loginLink");
    const logoutLink = document.getElementById("logoutLink");
    const welcomeMessage = document.getElementById("welcomeMessage");
    const cartList = document.querySelector('.cart_list');
    const currentDateTimeElement = document.getElementById('currentDateTime');
    const popupBg = document.getElementById('popupBg');
    const openFormBtn = document.getElementById('openForm');
    const closeFormBtn = document.getElementById('closeForm');
    const steps = document.querySelectorAll(".step");
    const confirmationDiv = document.getElementById("confirmation");
    const notificationAudio = document.getElementById('notificationAudio');
    const notificationBtn = document.getElementById('notificationBtn');
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');
    const menuItems = document.querySelectorAll('.nav-link'); // Выбираем все навигационные ссылки
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let currentStep = parseInt(localStorage.getItem("currentStep")) || 0;
    let isWhiteBackground = localStorage.getItem("backgroundColor") === "grey" ? false : true;

    // Проверка состояния пользователя
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        loginLink.style.display = "none";
        logoutLink.style.display = "block";
        welcomeMessage.innerText = `Welcome, ${user.username}!`;
    } else {
        loginLink.style.display = "block";
        logoutLink.style.display = "none";
        welcomeMessage.innerText = "";
    }
    const themeToggleBtn = document.getElementById("themeToggleBtn");
const body = document.body;
const form = document.getElementById("contactForm");

// Set theme on page load
const storedTheme = localStorage.getItem("theme");
body.className = storedTheme ? storedTheme : 'light-theme'; // Default to light theme

// Update form styles based on theme
updateFormStyles();

// Theme toggle button click handler
themeToggleBtn.addEventListener("click", function() {
    // Toggle between themes
    body.classList.toggle("dark-theme");
    body.classList.toggle("light-theme");

    // Save the selected theme to local storage
    const theme = body.classList.contains("dark-theme") ? "dark-theme" : "light-theme";
    localStorage.setItem("theme", theme);

    // Update form styles
    updateFormStyles();

    // Play notification sound
    const audio = document.getElementById("dayNight");
    if (audio) {
        audio.play();
    }
});

// Function to update form styles based on the current theme
function updateFormStyles() {
    if (body.classList.contains("dark-theme")) {
        form.style.backgroundColor = "#333"; // Dark background for form
        form.style.color = "#fff"; // Light text for form
        // Update input styles for dark theme
        const inputs = form.querySelectorAll("input, textarea");
        inputs.forEach(input => {
            input.style.backgroundColor = "#555"; // Darker input background
            input.style.color = "#fff"; // Light input text
        });
    } else {
        form.style.backgroundColor = "#fff"; // Light background for form
        form.style.color = "#000"; // Dark text for form
        // Update input styles for light theme
        const inputs = form.querySelectorAll("input, textarea");
        inputs.forEach(input => {
            input.style.backgroundColor = "#f8f9fa"; // Lighter input background
            input.style.color = "#000"; // Dark input text
        });
    }
}



    // Функция добавления товара в корзину
    function addToCart(productName, productPrice) {
        const product = cart.find(item => item.name === productName);
        if (product) {
            product.count++;
        } else {
            cart.push({ name: productName, price: productPrice, count: 1 });
        }
        updateCart();
    }

    // Функция обновления корзины
    function updateCart() {
        cartList.innerHTML = '';
        let totalCost = 0;

        cart.forEach(item => {
            const productCost = item.price * item.count;
            totalCost += productCost;

            const cartItem = `
                <div class="card mb-3">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="https://1evel.ru/wa-data/public/shop/categories/2064/advancedparams/1920x960.jpg" class="img-fluid rounded-start" alt="${item.name}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${item.name}</h5>
                                <p class="card-text">Count: ${item.count}</p>
                                <p class="card-text">
                                    <div class="btn-group" role="group">
                                        <button type="button" class="btn btn-outline-primary" onclick="updateQuantity('${item.name}', -1)">-1</button>
                                        <button type="button" class="btn btn-outline-primary" onclick="updateQuantity('${item.name}', 1)">+1</button>
                                    </div>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>`;
            cartList.innerHTML += cartItem;
        });

        document.querySelector('.cart_list.mt-5').innerText = `Cost of cart: ${totalCost} ₪`;
        localStorage.setItem("cart", JSON.stringify(cart)); // Сохранение корзины в локальном хранилище
    }

    // Функция обновления количества товара
    function updateQuantity(productName, delta) {
        const product = cart.find(item => item.name === productName);
        if (product) {
            product.count += delta;
            if (product.count <= 0) {
                cart = cart.filter(item => item.name !== productName);
            }
            updateCart();
        }
    }

    // Функция для отображения текущей даты и времени
    function displayDateTime() {
        const now = new Date();
        const formattedDate = now.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        currentDateTimeElement.textContent = formattedDate;
    }
    setInterval(displayDateTime, 1000);


    // Валидация email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // Валидация контактной формы
    document.getElementById('contactForm').addEventListener('submit', function (event) {
        let valid = true;
        emailField.classList.remove('is-invalid');
        messageField.classList.remove('is-invalid');

        if (!validateEmail(emailField.value.trim())) {
            emailField.classList.add('is-invalid');
            valid = false;
        }

        if (messageField.value.trim().length < 10) {
            messageField.classList.add('is-invalid');
            valid = false;
        }

        if (!valid) {
            event.preventDefault();
        }
    });

    // Обработчики всплывающей формы
    openFormBtn.addEventListener('click', () => {
        popupBg.style.display = 'block';
    });

    closeFormBtn.addEventListener('click', () => {
        popupBg.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === popupBg) {
            popupBg.style.display = 'none';
        }
    });

    // Функция для обработки навигации по клавиатуре
    const handleKeyDown = (event) => {
        let currentIndex = Array.from(menuItems).indexOf(document.activeElement);

        if (event.key === "ArrowDown") {
            const nextIndex = (currentIndex + 1) % menuItems.length;
            menuItems[nextIndex].focus();
            event.preventDefault();
        } else if (event.key === "ArrowUp") {
            const prevIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
            menuItems[prevIndex].focus();
            event.preventDefault();
        }
    };

    // Добавление слушателя событий keydown для меню
    menuItems.forEach(item => {
        item.addEventListener('keydown', handleKeyDown);
    });

    // Логика для уведомлений
    notificationBtn.addEventListener('click', function () {
        notificationAudio.currentTime = 0;
        notificationAudio.play().catch(function (error) {
            console.error("Ошибка воспроизведения аудио:", error);
        });
    });

    // Логика многошаговой формы
    const showStep = (index) => {
        steps.forEach((step, i) => {
            step.classList.toggle("active", i === index);
        });

        if (index === steps.length - 1) {
            const firstName = document.getElementById("firstName").value;
            const lastName = document.getElementById("lastName").value;
            const email = emailField.value;
            const phone = document.getElementById("phone").value;

            confirmationDiv.innerHTML = `
                <p>First Name: ${firstName}</p>
                <p>Last Name: ${lastName}</p>
                <p>Email: ${email}</p>
                <p>Phone: ${phone}</p>
            `;
        }

        // Сохранение текущего шага в локальном хранилище
        localStorage.setItem("currentStep", index);
    };

    document.querySelector("#nextBtn").addEventListener("click", () => {
        if (currentStep < steps.length - 1) {
            currentStep++;
            showStep(currentStep);
        }
    });

    document.querySelector("#prevBtn").addEventListener("click", () => {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    });

    showStep(currentStep); // Показываем текущий шаг
});
