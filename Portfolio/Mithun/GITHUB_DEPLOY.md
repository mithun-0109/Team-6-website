# How to Host Your Portfolio on GitHub Pages

## Prerequisites
- You must have a **GitHub Account**. If not, sign up at [github.com](https://github.com).
- **Git** must be installed on your computer.

## Step 1: Create a Repository on GitHub
1. Log in to GitHub.
2. Click the **+** icon in the top-right corner and select **New repository**.
3. Name the repository (e.g., `my-portfolio`).
4. Make sure it is **Public**.
5. Do **not** initialize with README, .gitignore, or License (since we have local files).
6. Click **Create repository**.

## Step 2: Push Your Code to GitHub
Open your terminal (Command Prompt or PowerShell) in your project folder (`c:\Users\mithu\OneDrive\Desktop\Portfolio`) and run these commands one by one:

```bash
# 1. Initialize Git (if not already done)
git init

# 2. Add all your files
git add .

# 3. Commit your changes
git commit -m "Initial portfolio upload"

# 4. Link your local folder to your GitHub repo
# REPLACE 'YOUR_USERNAME' and 'REPO_NAME' with your actual details!
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# 5. Rename the branch to main (standard practice)
git branch -M main

# 6. Push your code
git push -u origin main
```

## Step 3: Enable GitHub Pages
1. Go to your repository page on GitHub.
2. Click on **Settings** (top tabs).
3. On the left sidebar, click **Pages** (under the "Code and automation" section).
4. Under **Build and deployment** -> **Source**, select **Deploy from a branch**.
5. Under **Branch**, select **main** and folder **/(root)**.
6. Click **Save**.

## Step 4: Visit Your Website
- GitHub will take a minute or two to build your site.
- Refresh the Pages settings page. You will see a message: "Your site is live at..."
- Click the link to view your live portfolio!

## Important Note about the Admin Panel
Your **Admin Panel** uses `localStorage`, which saves data **only in your browser** on your specific computer.
- When you host this site, **visitors will NOT see your admin changes** initially because the database is local to *you*.
- Visitors will only see the "hardcoded" fallback content in `script.js` until you manually update the code with your real data or switch to a real backend (Database).
- **Quick Fix for Static Hosting**:
    1. Fill out your details in the Admin Panel on your local machine.
    2. Open Console (`F12` -> Console) and type `JSON.stringify(localStorage.getItem('mithun_portfolio_projects'))`.
    3. Copy that data and paste it into `script.js` in the `loadProjects` fallback section.
    4. Push the changes to GitHub.
