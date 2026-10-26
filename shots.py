from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome');pg=b.new_page(viewport={'width':1100,'height':900})
    B='http://localhost:3000';pg.goto(B);pg.screenshot(path='screenshots/home.png',full_page=True)
    pg.goto(B+'/daycare');pg.fill('[name=parent]','Test Parent');pg.fill('[name=phone]','000');pg.fill('[name=child]','Test Kid');pg.click('text=Send request')
    pg.goto(B+'/login');pg.fill('[name=username]','parent1');pg.fill('[name=password]','parent123');pg.click('button:has-text("Login")')
    pg.screenshot(path='screenshots/kid-profile-warning.png',full_page=True)
    pg.goto(B+'/logout');pg.goto(B+'/login');pg.fill('[name=username]','Principal');pg.fill('[name=password]','Principal@Aarunya');pg.click('button:has-text("Login")')
    pg.screenshot(path='screenshots/admin-dashboard.png',full_page=True)
    pg.goto(B+'/admin?t=bookings');print(pg.inner_text('main')[:300])
    m=p.chromium.launch(executable_path='/usr/bin/google-chrome').new_page(viewport={'width':390,'height':800});m.goto(B);m.screenshot(path='screenshots/home-mobile.png')
