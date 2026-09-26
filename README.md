# 🔐 Password Strength Analyzer & Generator

> Weak passwords get cracked. Good ones protect your life.

Password Strength Analyzer is a client-side tool that inspects passwords for strength, entropy, and known public data breaches, while also letting you instantly generate secure, randomized credentials—keeping your data safe with full transparency and zero server-side storage.

---

## ✨ Why this tool?

Most online password checkers secretly collect your inputs or test against outdated, simplistic rules.

This tool evaluates true entropy and checks against hundreds of millions of compromised passwords using secure $k$-Anonymity lookups. Additionally, the built-in password generator lets you instantly create strong passwords customized by length and character preferences (uppercase, lowercase, numbers, and symbols). Your raw password never leaves your browser, ensuring complete privacy while delivering actionable security.

---

## 🌐 Live App

-> [Try the live tool at password-strength-analyzer-and-auto.vercel.app](https://password-strength-analyzer-and-auto.vercel.app)

---

## 🛠️ How It Works

1. **Client-side Hashing:** Creates a SHA-1 hash of the entered password locally.
2. **Hashed-Prefix Query:** Sends only the first 5 characters of the hash to the breach API.
3. **Local Match:** Compares remaining characters against the returned hash list right on your device.
4. **Secure Generation:** Uses client-side logic to generate customizable, high-entropy passwords on demand.
