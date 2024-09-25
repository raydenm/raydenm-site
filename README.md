# Personal website.

## Overview

- `/` — Home page.
- `/writing` — Writing page.
- `/writing/[slug]` — Static pre-rendered writing pages using [Contentful](https://www.contentful.com).
- `/stack` — Stack page.
- `/bookmarks` — Bookmarks page.
- `/bookmarks/[slug]` — Static pre-rendered bookmarks pages using [Raindrop](https://raindrop.io/).
- `/photo` - Photo page.
- `/journey` - Journey page.
- `/api` — API routes.

## Running Locally

Create a `.env` file similar to [`.env.example`] and get env data from Contentful/Raindrop/Resend/Umami/Giscus/Memfiredb or Supabase. Set website url and username.

Change config in `src/config`.

## Tech Stack

- [Next.js](https://nextjs.org): A React framework for building fast websites with support for server-side rendering and static site generation. It offers powerful features like API routes and automatic code splitting.
- [Tailwind CSS](https://tailwindcss.com): A utility-first CSS framework that provides low-level styling tools to help you quickly create fully responsive modern designs.
- [Shadcn UI](https://ui.shadcn.com): A customizable UI component library built on Tailwind and Radix, offering pre-designed components to speed up development.
- [Contentful](https://www.contentful.com): A headless CMS that allows you to manage and deliver content across digital channels through flexible APIs.
- [Raindrop](https://raindrop.io): A smart bookmarking tool that helps you efficiently organize, save, and share web content.
- [Supabase](https://supabase.com): An open-source backend-as-a-service platform that provides a real-time database, authentication, and API endpoints.
- [Memfiredb](https://memfiredb.com): Adopts open source Supabase, compatible with domestic development ecosystem.
- [Resend](https://resend.com): A developer-friendly email service that simplifies email sending via APIs and supports modern email templates.
- [Giscus](https://giscus.app): An open-source comment system integrated with GitHub that uses GitHub Discussions to manage comments on your website.
- [Umami](https://umami.is): A lightweight open-source web analytics tool that provides privacy-friendly data insights without relying on cookies or tracking scripts.
- [Cloudflare](https://cloudflare.com): A leading global content delivery network (CDN) and security services provider, offering a globally distributed CDN with edge functions.
