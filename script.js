// ========================================
// GANESH PUJA COMMITTEE - ENHANCED JS
// Vakratunda Puja Committee, Punanga
// ========================================

const COMMITTEE_PHONE = "918328986832";
const UPI_ID = "8249481673@ybl";
let currentAmount = "501"; // Default matches the active button in HTML

// Toast Notification
function showToast(message, type = "success") {
  const existing = document.querySelector(".toast-notification");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "toast-notification";
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === "error" ? "linear-gradient(135deg, #d32f2f, #f44336)" : "linear-gradient(135deg, var(--primary, #0055a4), var(--accent, #ffcc00))"};
    color: white;
    padding: 14px 22px;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    z-index: 10001;
    font-weight: 600;
    font-size: 0.95rem;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    max-width: 90vw;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.transform = "translateX(0)";
  });

  setTimeout(() => {
    toast.style.transform = "translateX(400px)";
    setTimeout(() => toast.remove(), 350);
  }, 3000);
}

// Global Gallery Modal Functions
function openModal(img) {
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImg");
  const caption = document.getElementById("caption");
  if (!modal || !modalImg) return;

  modal.style.display = "block";
  modalImg.src = img.src;
  if (caption) caption.textContent = img.alt || "Ganesh Puja Committee Gallery";
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("imgModal");
  if (!modal) return;
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

// Copy UPI ID
function copyUPI() {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(UPI_ID)
      .then(() => showToast(`✅ UPI ID copied: ${UPI_ID}`))
      .catch(() => fallbackCopyUPI());
  } else {
    fallbackCopyUPI();
  }
}

function fallbackCopyUPI() {
  const textArea = document.createElement("textarea");
  textArea.value = UPI_ID;
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand("copy");
    showToast(`✅ UPI ID copied: ${UPI_ID}`);
  } catch (err) {
    showToast(`UPI ID: ${UPI_ID}`);
  }
  document.body.removeChild(textArea);
}

// Custom Amount Confirmation
function confirmCustomAmount() {
  const input = document.getElementById("customAmountInput");
  if (!input) return;

  const val = parseInt(input.value, 10);
  if (val >= 10) {
    currentAmount = val.toString();
    const customSection = document.getElementById("customInputSection");
    if (customSection) customSection.style.display = "none";

    document.querySelectorAll(".amt-btn").forEach((b) => b.classList.remove("active"));
    const customBtn = document.getElementById("customAmountBtn");
    if (customBtn) customBtn.classList.add("active");

    showToast(`✅ Custom amount set: ₹${currentAmount}`);
  } else {
    showToast("⚠️ Minimum ₹10 required!", "error");
    input.focus();
  }
}

// Open UPI Payment
function openUpiPayment(app, amount) {
  const payeeName = "Ganesh Puja Committee";
  const note = "Committee Puja Donation 2026";
  const encodedParams = `pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(payeeName)}&am=${encodeURIComponent(amount)}&cu=INR&tn=${encodeURIComponent(note)}`;

  const links = {
    phonepe: `phonepe://pay?${encodedParams}`,
    gpay: `tez://upi/pay?${encodedParams}`,
    paytm: `paytmmp://pay?${encodedParams}`,
  };

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const targetUrl = links[app] || `upi://pay?${encodedParams}`;

  if (isMobile) {
    showToast(`🔔 Opening ${app.toUpperCase()}...`);
    window.location.href = targetUrl;
  } else {
    showToast(`📱 On desktop? Scan the QR code or copy UPI ID (${UPI_ID}) to pay ₹${amount}.`);
  }
}

// Confetti Celebration
function celebrateDonation() {
  const colors = ["#ff6b35", "#ffcc00", "#0055a4", "#4caf50", "#e91e63"];
  for (let i = 0; i < 40; i++) {
    const confetti = document.createElement("div");
    const color = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.cssText = `
      position: fixed;
      width: ${8 + Math.random() * 6}px;
      height: ${8 + Math.random() * 6}px;
      background: ${color};
      border-radius: ${Math.random() > 0.5 ? "50%" : "2px"};
      left: ${Math.random() * 100}vw;
      top: -15px;
      z-index: 10002;
      opacity: 0.9;
      pointer-events: none;
      animation: fallDown ${2.5 + Math.random() * 1.5}s linear forwards;
    `;
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 4000);
  }
}

// Close Confirmation Modal & Reset Form
function closeConfirmSection() {
  const confirmSection = document.getElementById("confirmSection");
  const quickPay = document.querySelector(".upi-quick-pay");
  if (confirmSection) confirmSection.style.display = "none";
  if (quickPay) quickPay.style.display = "block";
}

// ========================================
// DOM READY INITIALIZATION
// ========================================
document.addEventListener("DOMContentLoaded", function () {
  // 1. Footer Year
  const yrEl = document.getElementById("yr");
  if (yrEl) yrEl.textContent = new Date().getFullYear();

  // 2. Countdown Timer (IST Timezone: 14 Sep 2026 11:00 AM)
  const pujaDate = new Date("2026-09-14T11:00:00+05:30").getTime();
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");
  const countdownDisplay = document.querySelector(".countdown-display");

  function updateCountdown() {
    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    const now = new Date().getTime();
    const distance = pujaDate - now;

    if (distance <= 0) {
      if (countdownDisplay) countdownDisplay.classList.add("countdown-celebration");
      daysEl.textContent = "🎉";
      hoursEl.textContent = "PUJA";
      minutesEl.textContent = "TIME";
      secondsEl.textContent = "🙏";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = days.toString().padStart(2, "0");
    hoursEl.textContent = hours.toString().padStart(2, "0");
    minutesEl.textContent = minutes.toString().padStart(2, "0");
    secondsEl.textContent = seconds.toString().padStart(2, "0");
  }

  if (daysEl) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // 3. Modal Keydown and Outside-click Listeners
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  const modal = document.getElementById("imgModal");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  const modalCloseBtn = document.querySelector(".modal .close");
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeModal);
  }

  // 4. Back to Top Button (single throttled scroll listener)
  const toTop = document.getElementById("toTop");
  if (toTop) {
    let scrollScheduled = false;
    window.addEventListener("scroll", () => {
      if (scrollScheduled) return;
      scrollScheduled = true;
      requestAnimationFrame(() => {
        toTop.style.display = window.scrollY > 300 ? "block" : "none";
        scrollScheduled = false;
      });
    }, { passive: true });

    toTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // 5. Smooth Scroll Navigation
  document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId && targetId !== "#") {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  // 6. Section Fade-in Animation on Scroll
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in", "visible");
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });

    document.querySelectorAll("section").forEach((section) => {
      observer.observe(section);
    });
  }

  // 7. Donation Amount Buttons Handler (REGISTERED ONCE)
  document.querySelectorAll(".amt-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".amt-btn").forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      const amount = this.dataset.amount;
      const customSection = document.getElementById("customInputSection");

      if (amount === "custom" || this.id === "customAmountBtn") {
        if (customSection) {
          customSection.style.display = "flex";
          const input = document.getElementById("customAmountInput");
          if (input) input.focus();
        }
      } else {
        if (customSection) customSection.style.display = "none";
        currentAmount = amount;
        showToast(`✅ Amount set: ₹${currentAmount}`);
      }
    });
  });

  // 8. UPI App Payment Buttons Handler (REGISTERED ONCE)
  document.querySelectorAll(".upi-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const app = this.dataset.app;
      openUpiPayment(app, currentAmount);

      // Show confirmation section with name input
      setTimeout(() => {
        const confirmSection = document.getElementById("confirmSection");
        const quickPay = document.querySelector(".upi-quick-pay");
        if (confirmSection) {
          confirmSection.style.display = "block";
          if (quickPay && window.innerWidth <= 768) {
            quickPay.style.display = "none";
          }
          const nameInput = document.getElementById("donorName");
          if (nameInput) nameInput.focus();
        }
      }, 1500);
    });
  });

  // 9. Close Confirmation Section Button Handler
  const closeConfirmBtn = document.getElementById("closeConfirmBtn");
  if (closeConfirmBtn) {
    closeConfirmBtn.addEventListener("click", closeConfirmSection);
  }

  // 10. WhatsApp Form Submission Handler
  const whatsappForm = document.getElementById("whatsappForm");
  if (whatsappForm) {
    whatsappForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const nameInput = document.getElementById("donorName");
      const messageInput = document.getElementById("donormessage");
      const name = nameInput ? nameInput.value.trim() : "";
      const message = messageInput ? messageInput.value.trim() : "";

      if (!name) {
        showToast("Please enter your name", "error");
        return;
      }

      const text = `🙏 *Ganesh Puja Donation 2026*\n*Name:* ${name}\n*Amount:* ₹${currentAmount}\n*Message:* ${message || "Ganapati Bappa Morya!"}`;
      const whatsappURL = `https://wa.me/${COMMITTEE_PHONE}?text=${encodeURIComponent(text)}`;

      window.open(whatsappURL, "_blank");
      celebrateDonation();

      setTimeout(() => {
        whatsappForm.reset();
        closeConfirmSection();
        showToast("🙏 Thank you for your generous devotion & donation!");
      }, 1200);
    });
  }

  // 11. Custom Amount Input Enter Key Support
  const customInput = document.getElementById("customAmountInput");
  if (customInput) {
    customInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        confirmCustomAmount();
      }
    });
  }

  // 12. Add Confetti Keyframe Style
  const animStyle = document.createElement("style");
  animStyle.textContent = `
    @keyframes fallDown {
      0% { transform: translateY(0) rotate(0deg); opacity: 1; }
      100% { transform: translateY(105vh) rotate(720deg); opacity: 0; }
    }
  `;
  document.head.appendChild(animStyle);
});
