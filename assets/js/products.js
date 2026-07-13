document.addEventListener('DOMContentLoaded', function() {
      const sizeButtons = document.querySelectorAll('.size-btn');
      
      sizeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
          e.preventDefault();
          
          const productCard = this.closest('.product-card');
          const allButtons = productCard.querySelectorAll('.size-btn');
          allButtons.forEach(btn => btn.classList.remove('active'));
          
          this.classList.add('active');
          
          const price = this.getAttribute('data-price');
          const priceDisplay = productCard.querySelector('[data-display-price]');
          const formattedPrice = new Intl.NumberFormat('en-IN').format(price);
          priceDisplay.textContent = '₹' + formattedPrice;
          priceDisplay.setAttribute('data-display-price', price);
        });
      });
    });
