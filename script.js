 const products = [
            {
                id: 1,
                name: "Premium Wool Fabric",
                price: 850,
                category: "fabrics",
                description: "High-quality wool blend perfect for formal suits",
                emoji: "https://www.google.com/search?vsrid=CIuchbyDwfeV8QEQAhgBIiQ0ZmI3MjRkNS0xMjQwLTQ3OWItYmY2ZC0wMTYzMDM3ZjU4NGUyBiICdHAoMzis9faF-PCNAw&vsint=CAIqDAoCCAcSAggKGAEgATojChYNAAAAPxUAAAA_HQAAgD8lAACAPzABEKsCGKgBJQAAgD8&udm=26&lns_mode=un&source=lns.web.gsbubb&vsdim=299,168&gsessionid=m40huLgJ5uJM7DllQmbpUUszGOjE2nJtRytdHIoBbvkbOebZn_YTQw&lsessionid=kdjBvIhUSYc7eFrgXZ2-GQa2JcYgUMdBiQoUyfr3VmBIufBHj5P89A&lns_surface=26&authuser=0&lns_vfs=e&qsubts=1749904980095&biw=1280&bih=551&hl=en-IN"
            },
            {
                id: 2,
                name: "Cotton Formal Fabric",
                price: 420,
                category: "fabrics",
                description: "Breathable cotton fabric for summer formals",
                emoji: "👔"
            },
            {
                id: 3,
                name: "Silk Lining Material",
                price: 650,
                category: "fabrics",
                description: "Smooth silk lining for premium finish",
                emoji: "✨"
            },
            {
                id: 4,
                name: "Metal Suit Buttons",
                price: 120,
                category: "buttons",
                description: "Elegant metal buttons for formal wear",
                emoji: "🔘"
            },
            {
                id: 5,
                name: "Horn Buttons Set",
                price: 10,
                category: "buttons",
                description: "Natural horn buttons for luxury finish",
                // emoji: "⚫"
            },
            {
                id: 6,
                name: "Polyester Thread",
                price: 3,
                category: "threads",
                description: "Strong polyester thread for durable stitching",
                emoji: "🧵"
            },
            {
                id: 7,
                name: "Silk Thread",
                price: 85,
                category: "threads",
                description: "Premium silk thread for fine stitching",
                emoji: "🪡"
            },
            {
                id: 8,
                name: "Suit Shoulder Pads",
                price: 150,
                category: "accessories",
                description: "Professional shoulder pads for structured look",
                emoji: "📐"
            },
            {
                id: 9,
                name: "Interfacing Material",
                price: 95,
                category: "accessories",
                description: "Fusible interfacing for collar and cuffs",
                emoji: "📏"
            },
            {
                id: 10,
                name: "Zippers Set",
                price: 75,
                category: "accessories",
                description: "High-quality zippers for pants and jackets",
                emoji: "🤐"
            },
            {
                id: 11,
                name: "Linen Blend Fabric",
                price: 550,
                category: "fabrics",
                description: "Premium linen blend for casual formals",
                emoji: "🌿"
            },
            {
                id: 12,
                name: "Mother of Pearl Buttons",
                price: 250,
                category: "buttons",
                description: "Luxurious mother of pearl buttons",
                emoji: "🐚"
            }
        ];

        // Cart functionality
        let cart = [];
        let currentFilter = 'all';

        // Initialize the website
        document.addEventListener('DOMContentLoaded', function() {
            displayProducts(products);
            updateCartCount();
        });

        // Display products
        function displayProducts(productsToShow) {
            const grid = document.getElementById('productsGrid');
            grid.innerHTML = '';

            productsToShow.forEach(product => {
                const productCard = `
                    <div class="product-card" data-category="${product.category}">
                        <div class="product-image">${product.emoji}</div>
                        <div class="product-info">
                            <h3 class="product-name">${product.name}</h3>
                            <p class="product-desc">${product.description}</p>
                            <div class="product-price">₹${product.price}</div>
                            <button class="add-to-cart" onclick="addToCart(${product.id})">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                `;
                grid.innerHTML += productCard;
            });
        }

        // Filter products
        function filterProducts(category) {
            currentFilter = category;
            const filteredProducts = category === 'all' 
                ? products 
                : products.filter(product => product.category === category);
            
            displayProducts(filteredProducts);
            
            // Update active filter button
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
        }

        // Add to cart
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            const existingItem = cart.find(item => item.id === productId);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }

            updateCartCount();
            showAddedToCartAnimation();
        }

        // Update cart count
        function updateCartCount() {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            document.getElementById('cartCount').textContent = totalItems;
        }

        // Show added to cart animation
        function showAddedToCartAnimation() {
            const cartBtn = document.querySelector('.cart-btn');
            cartBtn.style.transform = 'scale(1.1)';
            setTimeout(() => {
                cartBtn.style.transform = 'scale(1)';
            }, 200);
        }

        // Open cart modal
        function openCart() {
            displayCartItems();
            document.getElementById('cartModal').style.display = 'block';
        }

        // Close cart modal
        function closeCart() {
            document.getElementById('cartModal').style.display = 'none';
        }

        // Display cart items
        function displayCartItems() {
            const cartItemsDiv = document.getElementById('cartItems');
            const cartTotal = document.getElementById('cartTotal');

            if (cart.length === 0) {
                cartItemsDiv.innerHTML = '<p style="text-align: center; color: #666;">Your cart is empty</p>';
                cartTotal.textContent = 'Total: ₹0';
                return;
            }

            let cartHTML = '';
            let total = 0;

            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;

                cartHTML += `
                    <div class="cart-item">
                        <div class="item-info">
                            <h4>${item.name}</h4>
                            <p>₹${item.price} each</p>
                        </div>
                        <div class="quantity-controls">
                            <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                            <span style="margin: 0 10px;">${item.quantity}</span>
                            <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                            <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                        </div>
                    </div>
                `;
            });

            cartItemsDiv.innerHTML = cartHTML;
            cartTotal.textContent = `Total: ₹${total.toLocaleString('en-IN')}`;
        }

        // Update quantity
        function updateQuantity(productId, change) {
            const item = cart.find(item => item.id === productId);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    removeFromCart(productId);
                } else {
                    displayCartItems();
                    updateCartCount();
                }
            }
        }

        // Remove from cart
        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            displayCartItems();
            updateCartCount();
        }

        // Proceed to checkout
        function proceedToCheckout() {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }

            closeCart();
            document.getElementById('checkoutSection').style.display = 'block';
            document.getElementById('checkoutSection').scrollIntoView({ behavior: 'smooth' });
            
            // Update checkout total
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            document.getElementById('checkoutTotal').textContent = `Order Total: ₹${total.toLocaleString('en-IN')}`;
        }

        // Handle checkout form submission
        document.getElementById('checkoutForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                pincode: document.getElementById('pincode').value,
                state: document.getElementById('state').value,
                items: cart,
                total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
            };

            // Here you would normally send the order to your server
            // and integrate with Razorpay for payment processing
            
            // For demo purposes, we'll simulate the order placement
            processOrder(formData);
        });

        // Process order (integrate with Razorpay here)
        function processOrder(orderData) {
            // Show loading state
            const submitBtn = document.querySelector('#checkoutForm button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                // This is where you would integrate Razorpay
                // For now, we'll just show a success message
                alert(`Thank you ${orderData.firstName}! Your order has been placed successfully. Total: ₹${orderData.total.toLocaleString('en-IN')}\n\nYou will receive a confirmation email shortly.`);
                
                // Reset cart and form
                cart = [];
                updateCartCount();
                document.getElementById('checkoutForm').reset();
                document.getElementById('checkoutSection').style.display = 'none';
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 2000);
        }

        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            const modal = document.getElementById('cartModal');
            if (event.target === modal) {
                closeCart();
            }
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add some visual feedback for interactions
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('add-to-cart')) {
                const button = e.target;
                const originalText = button.textContent;
                button.textContent = 'Added!';
                button.style.background = '#27ae60';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '';
                }, 1000);
            }
        });
