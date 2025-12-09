
from playwright.sync_api import sync_playwright, expect

def verify_wizard(page):
    print("Navigating to wizard...")
    # Updated URL
    page.goto("http://localhost:3000/onboarding-talent/wizard")

    # Wait for page to load
    page.wait_for_load_state("networkidle")

    # --- STEP 1: CATEGORY ---
    print("Step 1: Selecting Category...")
    # Select Group
    # Note: Using text matching that exists in my component
    page.click("text=Servicios del Hogar")
    # Select Category
    # Wait for the categories to appear (animation)
    page.wait_for_selector("text=Plomería", state="visible")
    page.click("text=Plomería")

    # Click Continue
    page.click("button:has-text('Continuar')")

    # --- STEP 2: IDENTITY ---
    print("Step 2: Identity...")
    page.wait_for_selector("text=Identidad", state="visible")

    page.fill("input[id='title']", "Super Plumber")
    page.fill("textarea[id='aboutMe']", "I am the best plumber in town.")
    page.fill("input[id='experience']", "5")
    page.click("text=Presencial")

    page.click("button:has-text('Continuar')")

    # --- STEP 3: COMMERCIAL ---
    print("Step 3: Commercial...")
    page.wait_for_selector("text=Política Comercial", state="visible")

    page.fill("input[id='refPrice']", "From $50")
    page.fill("input[id='visitCost']", "$10")
    page.fill("textarea[id='warranty']", "Lifetime warranty")

    page.click("button:has-text('Continuar')")

    # --- STEP 4: AVAILABILITY ---
    print("Step 4: Availability...")
    page.wait_for_selector("text=Disponibilidad", state="visible")

    page.fill("input[id='hours']", "Mon-Fri 9-5")
    # Add a city
    page.fill("input[placeholder*='Escribe una ciudad']", "Quito")
    page.wait_for_selector("text=Quito", state="visible")
    page.click("div:text-is('Quito')") # More specific selector for the dropdown item

    page.click("button:has-text('Continuar')")

    # --- STEP 5: MEDIA ---
    print("Step 5: Media...")
    page.wait_for_selector("text=Multimedia", state="visible")

    page.fill("input[id='coverImg']", "https://via.placeholder.com/150")
    page.fill("input[id='videoUrl']", "https://youtube.com/watch?v=123")

    page.click("button:has-text('Continuar')")

    # --- STEP 6: REVIEW ---
    print("Step 6: Review...")
    page.wait_for_selector("text=Revisión", state="visible")

    # Wait for content to render
    page.wait_for_selector("text=Super Plumber", state="visible")

    # Take screenshot
    print("Taking screenshot...")
    page.screenshot(path="/home/jules/verification/wizard_review.png", full_page=True)
    print("Done!")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            verify_wizard(page)
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="/home/jules/verification/error.png")
        finally:
            browser.close()
