# Online Platform Learning

A modern, full-featured online learning platform built with Next.js, featuring course management, user authentication, payment processing, and interactive video learning experiences.

![Online Platform Learning](https://img.shields.io/badge/Next.js-16.0.1-black) ![React](https://img.shields.io/badge/React-19.2.0-blue) ![Stripe](https://img.shields.io/badge/Stripe-Payments-635bff) ![Clerk](https://img.shields.io/badge/Clerk-Auth-6c47ff)

# 🎓 LearnHub - Online Learning Platform

A modern, full-stack online learning platform built with Next.js 16, featuring course management, payment processing, and user authentication.

> **📚 Educational Purpose Disclaimer**  
> This project was created for educational purposes to learn and demonstrate Next.js, React, and full-stack development skills. All YouTube videos and course content are used solely for learning and portfolio demonstration purposes.

![Next.js](https://img.shields.io/badge/Next.js-16-black) ![React](https://img.shields.io/badge/React-19-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC) ![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF) ![Stripe](https://img.shields.io/badge/Stripe-Payments-008CDD)

---

## ✨ Features

- 🔐 **Clerk Authentication** - Secure user management
- 📚 **Course Management** - Browse, preview, and enroll in courses
- 💳 **Stripe Integration** - Seamless payment processing
- 🎥 **Video Player** - YouTube-based course content
- 📊 **User Dashboard** - Track learning progress
- 💎 **Membership Tiers** - Free, Pro, and Enterprise plans
- 📧 **Newsletter** - Stay updated with latest content

---

## 🛠️ Tech Stack

**Frontend:**
- Next.js 16 (App Router)
- React 19
- Tailwind CSS
- Shadcn UI
- Lucide Icons

**Backend & Services:**
- Clerk (Authentication)
- Hygraph (GraphQL CMS)
- Stripe (Payments)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Clerk account
- Hygraph account
- Stripe account (test mode)

### Installation

1. Clone the repository
git clone https://github.com/DEV-TAlHATANVEER/online_platform_learning.git
cd online_platform_learning

2. Install dependencies
npm install

3. Create `.env.local` file
Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx

Hygraph
NEXT_PUBLIC_HYGRAPH_URL=your_hygraph_project_id

Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

App
NEXT_PUBLIC_APP_URL=http://localhost:3000

4. Run development server
npm run dev

5. Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

online_platform_learning/
├── app/
│ ├── (auth)/ # Authentication routes
│ ├── (router)/ # Main routes
│ │ ├── course/ # Course listing
│ │ ├── course-preview/ # Course preview
│ │ ├── dashborad/ # User dashboard
│ │ ├── membership/ # Membership page
│ │ ├── newsletter/ # Newsletter page
│ │ └── watch-course/ # Course viewer
│ └── api/ # API routes
├── middleware.js
└── README.md


---

## 🔧 Configuration

### Clerk Setup
1. Create account at [clerk.com](https://clerk.com)
2. Copy API keys
3. Set redirect URLs to `/dashborad`

### Hygraph Setup
1. Create project at [hygraph.com](https://hygraph.com)
2. Create models: CourseList, Chapter, UserEnrollCourse
3. Copy API endpoint

### Stripe Setup
1. Get test API keys from [stripe.com](https://stripe.com)
2. For local testing:
stripe listen --forward-to localhost:3000/api/webhook/stripe



---

## 🧪 Testing

### Test Payments (Stripe)
- Success: `4242 4242 4242 4242`
- Declined: `4000 0000 0000 0002`
- CVC: Any 3 digits
- Expiry: Any future date

---

## 🐛 Troubleshooting

**Stripe webhook not working:**
- Ensure Stripe CLI is running
- Check webhook secret in `.env.local`

**Enrollment not updating:**
- Check Hygraph API permissions
- Verify content is published

**Login issues:**
- Clear browser cache
- Check Clerk API keys
- Verify redirect URLs

---

## 📊 Database Schema (Hygraph)


---

## 🎯 Deployment

### Recommended Platforms
- **Vercel** - Best for Next.js
- **Netlify** - Great alternative
- **Railway** - Full-stack hosting

### Production Checklist
- [ ] Update environment variables
- [ ] Configure Stripe webhooks
- [ ] Set up DNS records for Clerk
- [ ] Test payment flow
- [ ] Enable SSL

---

## 👨‍💻 Developer

**Talha Tanveer**
- GitHub: [@DEV-TAlHATANVEER](https://github.com/DEV-TAlHATANVEER)

---

## 🙏 Acknowledgments

- YouTube tutorials for educational content
- Next.js documentation
- Clerk, Stripe, and Hygraph teams

---

## 📝 License

This project is for educational purposes. All content used for learning demonstration only.

---

## ⚠️ Important Notes

1. **Educational Purpose**: YouTube videos and course content used purely for educational demonstration
2. **Test Mode**: Always test Stripe in test mode first
3. **Content Rights**: Replace demo content before commercial use
4. **API Keys**: Never commit `.env.local` to git

---

## 🎓 What I Learned

- Full-stack Next.js 16 development
- Clerk authentication implementation
- Stripe payment processing
- GraphQL with Hygraph
- Tailwind CSS styling
- State management in React
- Server/Client component patterns

---

## 🚀 Future Enhancements

- [ ] Course completion certificates
- [ ] Progress analytics
- [ ] Reviews and ratings
- [ ] Discussion forums
- [ ] Admin dashboard
- [ ] Mobile app
- [ ] Dark mode

---

**Built with ❤️ for learning purposes**

*Educational project demonstrating full-stack development skills. All content used for learning only.*
