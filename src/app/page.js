"use client";

import Image from "next/image";
import { useState } from "react";

const whatsAppNumber = "8801309442429";

const products = [
  {
    id: "textnow",
    category: "Make room for more",
    name: "TextNow",
    description: "Explore a free second number for calls and texts over Wi-Fi.",
    priceLabel: "Ask for price",
    stock: 18,
    art: "sim-art",
    image: "/products/textnow.png",
  },
  {
    id: "sideline",
    category: "Your second line",
    name: "Sideline",
    description: "Keep personal and work calls on separate lines.",
    priceLabel: "Ask for price",
    stock: 12,
    art: "talk-art",
    image: "/products/sideline.png",
  },
  {
    id: "google-voice",
    category: "Calls that travel",
    name: "Google Voice",
    description: "A flexible phone number for calls, texts, and voicemail.",
    priceLabel: "Ask for price",
    stock: 9,
    art: "data-art",
    image: "/products/google-voice.png",
  },
  {
    id: "chatsms",
    category: "Keep the conversation going",
    name: "ChatSMS",
    description: "A simple way to keep your messages close at hand.",
    priceLabel: "Ask for price",
    stock: 24,
    art: "sim-art",
    image: "/products/textfree.png",
  },
];

function getWhatsAppLink(product, quantity = 1) {
  const message = `Hi! I'd like to buy ${quantity} ${product.name}${quantity === 1 ? "" : " items"}. Please share the details.`;
  return `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(message)}`;
}

export default function Home() {
  const [quantities, setQuantities] = useState({});
  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [emailStatus, setEmailStatus] = useState("idle");

  function updateQuantity(product, amount) {
    setQuantities((currentQuantities) => {
      const currentQuantity = currentQuantities[product.id] || 1;
      return {
        ...currentQuantities,
        [product.id]: Math.max(1, Math.min(product.stock, currentQuantity + amount)),
      };
    });
  }

  function handleNewsletterSubmit(event) {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
      setEmailStatus("error");
      setEmailMessage("Please enter your email address.");
      return;
    }

    try {
      const savedEmails = JSON.parse(localStorage.getItem("socialbd-newsletter") || "[]");
      if (savedEmails.includes(normalizedEmail)) {
        setEmailStatus("success");
        setEmailMessage("You’re already on the list. Thanks for being here!");
        return;
      }
      localStorage.setItem(
        "socialbd-newsletter",
        JSON.stringify([...savedEmails, normalizedEmail]),
      );
      setEmailStatus("success");
      setEmailMessage("You’re on the list! Watch your inbox for good things.");
      setEmail("");
    } catch (error) {
      console.error("Could not save newsletter signup.", error);
      setEmailStatus("error");
      setEmailMessage("We couldn’t save your signup. Please try again.");
    }
  }

  return (
    <>
      <header className="site-header" id="home">
        <a className="brand" href="#home" aria-label="SocialBd home">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 36 36">
              <path d="M7 10.5A5.5 5.5 0 0 1 12.5 5h11A5.5 5.5 0 0 1 29 10.5v9a5.5 5.5 0 0 1-5.5 5.5h-2.2L14 30v-5h-1.5A5.5 5.5 0 0 1 7 19.5z" />
              <path className="brand-mark-cutout" d="M12 12h12v3H12zm0 6h8v3h-8z" />
            </svg>
          </span>
          <span className="brand-name">SocialBd</span>
        </a>

        <nav className="main-nav" aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#how-to-buy">How to buy</a>
          <a href="#shop">Shop</a>
        </nav>

        <a
          className="header-whatsapp"
          href={`https://wa.me/${whatsAppNumber}?text=${encodeURIComponent("Hi! I'd like to know more about your products.")}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main>
        <section className="reference-banner-section" aria-label="Stay connected with TextNow, Textfree, and Google Voice">
          <span className="banner-spark banner-spark-one" aria-hidden="true">✦</span>
          <span className="banner-spark banner-spark-two" aria-hidden="true">✳</span>
          <a className="reference-banner-link" href="#shop" aria-label="Explore the products">
            <Image
              className="reference-banner-image"
              src="/textnow-social-banner.png"
              alt="Stay connected: TextNow, Textfree, and Google Voice"
              width={1152}
              height={768}
              sizes="(max-width: 620px) calc(100vw - 28px), 1000px"
              preload
            />
          </a>
          <span className="banner-bubble banner-bubble-chat" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
            </svg>
          </span>
          <span className="banner-bubble banner-bubble-phone" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.21c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
          </span>
          <span className="banner-bubble banner-bubble-wifi" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M12 18.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM12 12c-2.2 0-4.2.86-5.7 2.26l2 2.02A5.47 5.47 0 0 1 12 14.8c1.4 0 2.7.56 3.7 1.48l2-2.02A9 9 0 0 0 12 12zm0-5.5A14.5 14.5 0 0 0 2.1 10.3l2 2.02A11.6 11.6 0 0 1 12 9.3c3.03 0 5.8 1.15 7.9 3.02l2-2.02A14.5 14.5 0 0 0 12 6.5z" />
            </svg>
          </span>
        </section>

        <section className="intro-section content-wrap" id="about">
          <div className="intro-copy">
            <p className="eyebrow eyebrow-dark">Welcome to SocialBd</p>
            <h2>Connection should feel <span>simple.</span></h2>
          </div>
          <p className="intro-description">
            We believe everyone deserves the freedom to connect. Find your number,
            choose what works for you, and keep the good conversations going.
          </p>
        </section>

        <section className="shop-section" id="shop">
          <div className="content-wrap">
            <div className="section-heading">
              <div>
                <p className="eyebrow eyebrow-dark">A little something for everyone</p>
                <h2>Find your <span>connection.</span></h2>
              </div>
              <p>Simple choices. No surprises. Pick what feels right for you.</p>
            </div>

            <div className="product-grid">
              {products.map((product) => (
                <article className="product-card" key={product.id}>
                  <div className={`product-art ${product.art}`}>
                    <Image
                      className="product-art-image"
                      src={product.image}
                      alt={`${product.name} artwork from the original banner`}
                      width={400}
                      height={300}
                      sizes="(max-width: 620px) 100vw, (max-width: 800px) 50vw, 25vw"
                    />
                  </div>
                  <div className="product-info">
                    <span className="product-category">{product.category}</span>
                    <div className="product-title-row">
                      <h3>{product.name}</h3>
                      <span className="product-price">{product.priceLabel}</span>
                    </div>
                    <p className="product-description">{product.description}</p>
                    <div className="product-footer">
                      <div className="product-stock-row">
                        <span className="product-stock">Available: {product.stock}</span>
                      </div>
                      <div className="product-action-row">
                        <div className="quantity-control" aria-label={`${product.name} quantity`}>
                          <button
                            type="button"
                            onClick={() => updateQuantity(product, -1)}
                            aria-label={`Remove one ${product.name}`}
                            disabled={(quantities[product.id] || 1) <= 1}
                          >−</button>
                          <span>{quantities[product.id] || 1}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(product, 1)}
                            aria-label={`Add one ${product.name}`}
                            disabled={(quantities[product.id] || 1) >= product.stock}
                          >+</button>
                        </div>
                        <a
                          className="buy-button whatsapp-buy"
                          href={getWhatsAppLink(product, quantities[product.id] || 1)}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Buy ${product.name} on WhatsApp`}
                        >
                          Buy on WhatsApp <span aria-hidden="true">↗</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <p className="store-note">Sample quantities shown. Confirm availability and price with us on WhatsApp.</p>
          </div>
        </section>

        <section className="steps-section content-wrap" id="how-to-buy">
          <div className="steps-intro">
            <p className="eyebrow eyebrow-dark">How to buy</p>
            <h2>Three little steps.<br /><span>Big connection.</span></h2>
            <p>Choose your product and quantity, then message us to confirm your order.</p>
            <a className="text-link" href="#shop">Explore the store <span aria-hidden="true">→</span></a>
          </div>
          <div className="steps-list">
            <article className="step-card">
              <span className="step-number">01</span>
              <div>
                <h3>Pick your product</h3>
                <p>Choose TextNow, Sideline, Google Voice, or ChatSMS.</p>
              </div>
              <span className="step-icon step-icon-purple" aria-hidden="true">✳</span>
            </article>
            <article className="step-card">
              <span className="step-number">02</span>
              <div>
                <h3>Choose your quantity</h3>
                <p>Set the sample quantity you want on the product card.</p>
              </div>
              <span className="step-icon step-icon-blue" aria-hidden="true">＋</span>
            </article>
            <article className="step-card">
              <span className="step-number">03</span>
              <div>
                <h3>Order on WhatsApp</h3>
                <p>Send your product and quantity to us and confirm the details in chat.</p>
              </div>
              <span className="step-icon step-icon-green" aria-hidden="true">↗</span>
            </article>
          </div>
        </section>

        <section className="newsletter-section" id="newsletter">
          <div className="newsletter-inner content-wrap">
            <div className="newsletter-copy">
              <p className="eyebrow">Good things, occasionally</p>
              <h2>A little more <span>in your inbox.</span></h2>
              <p>New ways to connect, good-to-know updates, and the occasional hello.</p>
            </div>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <label htmlFor="newsletter-email">Your email address</label>
              <div className="newsletter-input-row">
                <input
                  id="newsletter-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setEmailStatus("idle");
                    setEmailMessage("");
                  }}
                  required
                />
                <button type="submit">Count me in <span aria-hidden="true">→</span></button>
              </div>
              <p className={`form-message ${emailStatus}`} aria-live="polite">
                {emailMessage || "By signing up, you agree to receive occasional emails from SocialBd."}
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main content-wrap">
          <div className="footer-brand-column">
            <a className="brand footer-brand" href="#home" aria-label="SocialBd home">
              <span className="brand-mark" aria-hidden="true">
                <svg viewBox="0 0 36 36">
                  <path d="M7 10.5A5.5 5.5 0 0 1 12.5 5h11A5.5 5.5 0 0 1 29 10.5v9a5.5 5.5 0 0 1-5.5 5.5h-2.2L14 30v-5h-1.5A5.5 5.5 0 0 1 7 19.5z" />
                  <path className="brand-mark-cutout" d="M12 12h12v3H12zm0 6h8v3h-8z" />
                </svg>
              </span>
              <span className="brand-name">SocialBd</span>
            </a>
            <p>Free to talk.<br />Full of possibility.</p>
          </div>
          <div className="footer-links">
            <div>
              <h3>Explore</h3>
              <a href="#about">About us</a>
              <a href="#shop">Our store</a>
              <a href="#how-to-buy">How to buy</a>
            </div>
            <div>
              <h3>Say hello</h3>
              <a href="mailto:hello@socialbd.com">hello@socialbd.com</a>
              <a href="#newsletter">Join our email list</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom content-wrap">
          <span>© 2026 SocialBd. Stay connected.</span>
          <a href="#home">Back to top ↑</a>
        </div>
      </footer>

    </>
  );
}
