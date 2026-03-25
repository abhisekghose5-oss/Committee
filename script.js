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

// Back to top visibility (throttled to avoid scroll jank)
const toTop = document.getElementById("toTop");
let scrollScheduled = false;
window.addEventListener("scroll", () => {
  if (scrollScheduled) return;
  scrollScheduled = true;
  requestAnimationFrame(() => {
    toTop.style.display = window.scrollY > 300 ? "block" : "none";
    scrollScheduled = false;
  });
});

// ========================================
// GANESH PUJA COMMITTEE - ENHANCED JS
// Professional Gallery + Site Interactions + Countdown
// ========================================

document.addEventListener("DOMContentLoaded", function () {
  // 🎯 Year in footer
  document.getElementById("yr").textContent = new Date().getFullYear();

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
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // 📱 Gallery & Modal System
  const gallery = {
    modal: document.getElementById("imgModal"),
    modalImg: document.getElementById("modalImg"),
    caption: document.getElementById("caption"),
    images: document.querySelectorAll(
      '.gallery img[onclick="openModal(this)"]',
    ),

    open(img) {
      this.modal.style.display = "block";
      this.modalImg.src = img.src;
      this.caption.innerHTML = img.alt || "Ganesh Puja Gallery";
      this.modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      this.modalImg.classList.add("loaded");
    },

    close() {
      this.modal.style.display = "none";
      this.modalImg.classList.remove("loaded");
      this.modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    },
  };

  document
    .querySelector(".close")
    .addEventListener("click", () => gallery.close());

  gallery.modal.addEventListener("click", (e) => {
    if (e.target === gallery.modal) gallery.close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && gallery.modal.style.display === "block") {
      gallery.close();
    }
  });

  window.openModal = function (img) {
    gallery.open(img);
  };
  window.closeModal = function () {
    gallery.close();
  };

  gallery.images.forEach((img) => {
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
    navLinks.style.flexDirection = "column";
  }

  // 🌈 Particle effect on hero section (rate-limited for mobile/performance)
  const allowParticles =
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    !window.matchMedia("(max-width: 768px)").matches;
  let particleCount = 0;
  const maxParticles = 40;

  function createParticles(burst = 20) {
    if (!allowParticles) return;
    const hero = document.querySelector("header");
    const allowedBurst = Math.min(
      burst,
      Math.max(0, maxParticles - particleCount),
    );
    for (let i = 0; i < allowedBurst; i++) {
      setTimeout(() => {
        if (particleCount >= maxParticles) return;
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
        particleCount += 1;

        setTimeout(() => {
          particle.remove();
          particleCount = Math.max(0, particleCount - 1);
        }, 5000);
      }, i * 200);
    }
  }

  if (allowParticles) {
    setInterval(() => createParticles(12), 12000);
    createParticles(16);
  }

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
// UPI DONATION FUNCTIONS
// ========================================

function donateUPI(app) {
  const upiIds = {
    phonepe: "8249481673@ybl",
    gpay: "8249481@ybl",
    paytm: "8280016651@pthdfc",
    whatsapp: "918328986832", // replace whatsapp with number if you want direct WhatsApp payment
  };

  const upiId = upiIds[app] || "8249481673@ybl"; // Default UPI ID
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

/*function copyUPI() {
  const upiId = "   "; // CHANGE YOUR UPI ID
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
*/

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
const COMMITTEE_PHONE = "918328986832"; // CHANGE YOUR NUMBER
const UPI_ID = "8249481673@ybl"; // CHANGE YOUR UPI ID

// 1️⃣ Amount buttons
// 🔥 FIXED AMOUNT HANDLER (Replace your existing one)

// Handle ALL amount buttons (fixed + custom)

// Your existing UPI handler should already use currentAmount

document.querySelectorAll(".amt-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".upi-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const app = btn.dataset.app;
        openUpiPayment(app, currentAmount); // Uses ₹101, ₹501, OR custom amount!
      });
    });

    // Remove active class from all buttons
    document
      .querySelectorAll(".amt-btn")
      .forEach((b) => b.classList.remove("active"));
    this.classList.add("active");

    const amount = this.dataset.amount;

    if (amount === "custom") {
      // Show custom input
      document.getElementById("customInputSection").style.display = "flex";
      document.getElementById("customAmountInput").focus();
    } else {
      // Hide custom input + set fixed amount
      document.getElementById("customInputSection").style.display = "none";
      currentAmount = amount;
      showToast(`✅ Amount set: ₹${currentAmount}`);
    }
  });
});

// 🔥 Confirm Custom Amount
function confirmCustomAmount() {
  const customValue = parseInt(
    document.getElementById("customAmountInput").value,
  );

  if (customValue >= 10) {
    currentAmount = customValue.toString();
    document.getElementById("customInputSection").style.display = "none";
    document.getElementById("customAmountBtn").classList.add("active");
    showToast(`✅ Custom amount: ₹${currentAmount}`);
  } else {
    showToast("⚠️ Minimum ₹10 required!", "error");
    document.getElementById("customAmountInput").focus();
  }
}

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

document
  .getElementById("whatsappForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("donorName").value;
    const message = document.getElementById("donormessage").value;

    if (!name) {
      alert("Please enter your name");
      return;
    }

    // Replace with your WhatsApp number (country code required)
    const phoneNumber = "918328986832";

    const text = `Payment Successful!\nName: ${name}\nMessage: ${message}`;

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;

    window.open(whatsappURL, "_blank");
  });

// Reset
setTimeout(() => {
  document.getElementById("confirmSection").style.display = "none";
  document.querySelector(".upi-quick-pay").style.display = "block";
  document.getElementById("whatsappForm").reset();
}, 2000);

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

// 5️⃣ Button Loading State
//optiional

// Add after your existing JS
document.querySelectorAll(".amt-btn, .upi-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    this.classList.add("loading");
    setTimeout(() => this.classList.remove("loading"), 1500);
  });

  // Keyboard support
  btn.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this.click();
    }
  });
});

// Success animation
function celebrateDonation() {
  // Confetti effect
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.style.cssText = `
      position: fixed; width: 10px; height: 10px; background: #ff6b35;
      left: ${Math.random() * 100}vw; top: -10px; z-index: 9999;
      animation: fall 3s linear forwards;
    `;
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 3000);
  }
}
