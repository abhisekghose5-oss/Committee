// Year in footer
document.getElementById("yr").textContent = new Date().getFullYear();

// Gallery modal
function openModal(img) {
  document.getElementById("imgModal").style.display = "block";
  document.getElementById("modalImg").src = img.src;
  document.getElementById("caption").innerHTML = img.alt || "";
  document.getElementById("imgModal").setAttribute("aria-hidden", "false");
}
function closeModal() {
  document.getElementById("imgModal").style.display = "none";
  document.getElementById("imgModal").setAttribute("aria-hidden", "true");
}

// Close modal on click outside image
window.onclick = function (event) {
  const modal = document.getElementById("imgModal");
  if (event.target === modal) {
    closeModal();
  }
};

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// Back to top visibility
const toTop = document.getElementById("toTop");
window.addEventListener("scroll", () => {
  toTop.style.display = window.scrollY > 300 ? "block" : "none";
});

// ========================================
// GANESH PUJA COMMITTEE - ENHANCED JS
// Professional Gallery + Site Interactions
// ========================================

document.addEventListener("DOMContentLoaded", function () {
  // 🎯 Year in footer
  document.getElementById("yr").textContent = new Date().getFullYear();

  // 📱 Gallery & Modal System
  const gallery = {
    modal: document.getElementById("imgModal"),
    modalImg: document.getElementById("modalImg"),
    caption: document.getElementById("caption"),
    images: document.querySelectorAll(
      '.gallery img[onclick="openModal(this)"]',
    ),

    // 🔓 Open Modal with smooth animation
    open(img) {
      this.modal.style.display = "block";
      this.modalImg.src = img.src;
      this.caption.innerHTML = img.alt || "Ganesh Puja Gallery";
      this.modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden"; // Prevent background scroll

      // 🎨 Add loaded class for smooth transition
      this.modalImg.classList.add("loaded");
    },

    // 🔒 Close Modal
    close() {
      this.modal.style.display = "none";
      this.modalImg.classList.remove("loaded");
      this.modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = ""; // Restore scroll
    },
  };

  // 🖱️ Event Listeners
  // Close on X button
  document
    .querySelector(".close")
    .addEventListener("click", () => gallery.close());

  // Close on outside click
  gallery.modal.addEventListener("click", (e) => {
    if (e.target === gallery.modal) gallery.close();
  });

  // Close on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && gallery.modal.style.display === "block") {
      gallery.close();
    }
  });

  // 🖼️ Image click handlers (for onclick compatibility)
  window.openModal = function (img) {
    gallery.open(img);
  };
  window.closeModal = function () {
    gallery.close();
  };

  // ⚡ Image Loading Optimization
  gallery.images.forEach((img, index) => {
    img.onload = () => img.classList.add("loaded");
    img.onerror = () => {
      img.src =
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI5MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=";
      img.alt = "Image not available";
    };
  });

  // 🌟 Smooth Scroll Navigation
  document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // ⬆️ Back to Top Button
  const toTopBtn = document.getElementById("toTop");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      toTopBtn.style.display = "block";
      toTopBtn.style.opacity = "1";
    } else {
      toTopBtn.style.display = "none";
    }
  });

  toTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // ✨ Fade-in Animation on Scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in", "visible");
      }
    });
  }, observerOptions);

  // Observe all sections for animation
  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
  });

  // 🎭 Lazy Loading for Images (Performance)
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img);
    });
  }

  // 📱 Mobile Menu Toggle (Future-proof)
  const navLinks = document.querySelector(".links");
  if (window.innerWidth <= 768) {
    // Add hamburger menu functionality if needed
    navLinks.style.flexDirection = "column";
  }

  // 🌈 Add particle effect on hero section (Optional festive touch)
  function createParticles() {
    const hero = document.querySelector("header");
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const particle = document.createElement("div");
        particle.style.cssText = `
          position: absolute;
          width: 4px;
          height: 4px;
          background: var(--accent);
          border-radius: 50%;
          pointer-events: none;
          left: ${Math.random() * 100}%;
          top: 100%;
          animation: float ${3 + Math.random() * 2}s linear infinite;
          z-index: 10;
        `;
        particle.innerHTML = "✨";
        particle.style.fontSize = "12px";
        hero.appendChild(particle);

        setTimeout(() => particle.remove(), 5000);
      }, i * 200);
    }
  }

  // Start particles every 8 seconds
  setInterval(createParticles, 8000);
  createParticles(); // Initial burst

  // 💫 Custom CSS for particles (add to your CSS)
  const style = document.createElement("style");
  style.textContent = `
    @keyframes float {
      to {
        transform: translateY(-100vh) rotate(360deg);
        opacity: 0;
      }
    }
    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 20px rgba(255,204,0,0.5); }
      50% { box-shadow: 0 0 40px rgba(255,204,0,0.8); }
    }
  `;
  document.head.appendChild(style);

  // 🎉 Success: Console message
  console.log(
    "🌟 Ganesh Puja Committee Website Enhanced! Ready for Ganesh Chaturthi 2026 ✨",
  );
});

// ========================================
// PWA READY - Service Worker (Optional)
// ========================================
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Ignore if no sw.js exists
    });
  });
}

// ========================================
// GANESH PUJA COUNTDOWN + ENHANCED FEATURES
// ========================================

document.addEventListener("DOMContentLoaded", function () {
  // 🎯 Countdown Timer
  const pujaDate = new Date("2026-09-14T11:00:00").getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = pujaDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update display
    document.getElementById("days").textContent = days
      .toString()
      .padStart(2, "0");
    document.getElementById("hours").textContent = hours
      .toString()
      .padStart(2, "0");
    document.getElementById("minutes").textContent = minutes
      .toString()
      .padStart(2, "0");
    document.getElementById("seconds").textContent = seconds
      .toString()
      .padStart(2, "0");

    // Celebration mode (when countdown reaches 0)
    if (distance < 0) {
      document
        .querySelector(".countdown-display")
        .classList.add("countdown-celebration");
      document.getElementById("days").textContent = "🎉";
      document.getElementById("hours").textContent = "PUJA";
      document.getElementById("minutes").textContent = "TIME";
      document.getElementById("seconds").textContent = "🙏";
    }
  }

  // Update every second
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ... (keep all your existing gallery, scroll, etc. code from previous JS)

  console.log(
    "🕉️ Ganesh Chaturthi 2026 Countdown Active! Ganapati Bappa Morya! 🙏",
  );
});

// ========================================
// UPI DONATION FUNCTIONS
// ========================================

function donateUPI(app) {
  const upiIds = {
    phonepe: "ganeshpuja.punanga@paytm",
    gpay: "abhisekghose5@ybl",
    paytm: "ganeshpuja.punanga@paytm",
    whatsapp: "abhisekghose5@paytm",
  };

  const upiId = upiIds[app] || "abhisekghose5@ybl";
  const message = encodeURIComponent("Committee Puja Donation 2026 🙏");

  // UPI Deep Link URLs
  const upiLinks = {
    phonepe: `phonepe://pay?pa=${upiId}&pn=Ganesh Puja Committee&cu=INR&message=${message}`,
    gpay: `tez://tezxlp://pay?pa=${upiId}&pn=Ganesh Puja Committee&am=&cu=INR&tn=${message}`,
    paytm: `paytmmp://pay?pa=${upiId}&pn=Ganesh Puja Committee&amount=101&message=${message}`,
    whatsapp: `whatsapp://pay?pa=${upiId}`,
  };

  const link =
    upiLinks[app] ||
    `upi://pay?pa=${upiId}&pn=Ganesh Puja Committee&cu=INR&tn=${message}`;

  // Open UPI app
  window.open(link, "_blank");

  // Show success feedback
  showToast("🔔 Opening " + app.toUpperCase() + "...");
}

function copyUPI() {
  const upiId = "ganeshpuja.punanga@paytm";
  navigator.clipboard
    .writeText(upiId)
    .then(() => {
      showToast("✅ UPI ID copied! Paste in your UPI app");
    })
    .catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = upiId;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      showToast("✅ UPI ID copied!");
    });
}

function showToast(message) {
  // Create toast notification
  const toast = document.createElement("div");
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, var(--primary), var(--accent));
    color: white;
    padding: 15px 25px;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    z-index: 9999;
    font-weight: 600;
    transform: translateX(400px);
    transition: transform 0.3s ease;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);

  // Animate in
  setTimeout(() => (toast.style.transform = "translateX(0)"), 100);

  // Animate out
  setTimeout(() => {
    toast.style.transform = "translateX(400px)";
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 3000);
}

// ========================================
// COMPLETE UPI + WHATSAPP SYSTEM
// ========================================
let currentAmount = "101";
const COMMITTEE_PHONE = "919937109492"; // CHANGE YOUR NUMBER
const UPI_ID = "ganeshpuja.punanga@paytm";

// 1️⃣ Amount buttons
document.querySelectorAll(".amt-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".amt-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentAmount =
      btn.dataset.amount === "custom"
        ? document.getElementById("customAmount")?.value || "101"
        : btn.dataset.amount;
  });
});

// 2️⃣ UPI Payment + Auto WhatsApp
document.querySelectorAll(".upi-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const app = btn.dataset.app;

    // Open UPI
    openUpiPayment(app, currentAmount);

    // Auto show confirmation after 2.5s
    setTimeout(() => {
      document.getElementById("confirmSection").style.display = "block";
      document.querySelector(".upi-quick-pay").style.display = "none";
      document.getElementById("donorName").focus();
    }, 2500);
  });
});

// 3️⃣ WhatsApp Form
document.getElementById("whatsappForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("donorName").value;
  const phone = document.getElementById("donorPhone").value;

  const message = `🎉 DONATION CONFIRMED 🎉\n\n🙏 Donor: ${name}\n💰 Amount: ₹${currentAmount}\n📱 Phone: ${phone || "N/A"}\n⏰ ${new Date().toLocaleString("en-IN")}\n\nGanapati Bappa Morya! 🙌`;

  window.open(
    `https://wa.me/${COMMITTEE_PHONE}?text=${encodeURIComponent(message)}`,
    "_blank",
  );

  // Reset
  setTimeout(() => {
    document.getElementById("confirmSection").style.display = "none";
    document.querySelector(".upi-quick-pay").style.display = "block";
    document.getElementById("whatsappForm").reset();
  }, 2000);
});

// 4️⃣ UPI Links
function openUpiPayment(app, amount) {
  const params = `pa=${UPI_ID}&pn=Ganesh Puja Committee&am=${amount}&cu=INR&tn=Committee Puja Donation 2026 🙏`;
  const links = {
    gpay: `tez://pay?${params}`,
    phonepe: `phonepe://pay?${params}`,
    paytm: `paytmmp://pay?${params}`,
  };
  window.open(links[app] || `upi://pay?${params}`, "_blank");
}

function copyUPI() {
  navigator.clipboard.writeText(UPI_ID);
  alert("✅ UPI ID copied!");
}
