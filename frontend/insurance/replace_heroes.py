import os
import re

DIR = r'c:\Users\LENSTAR\Downloads\PROJECTS\VIMA SNEHA 2\frontend\insurance'
html_files = [f for f in os.listdir(DIR) if f.endswith('.html')]

# Dictionary to map files to the specific image we want to use
image_map = {
    'children-plans.html': '../assets/images/hero-family.png',
    'health-plans.html': '../assets/images/hero-wellness.png', # Since we have hero-wellness.png
    'pension-plans.html': '../assets/images/hero-family.png',
    'whole-life-plans.html': '../assets/images/hero-family.png',
}

def get_image(filename):
    return image_map.get(filename, '../assets/images/hero-insurance.png')

template = """    <!-- Hero Section -->
    <section class="section-padding !pt-0 mb-16 relative">
      <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 max-w-7xl mx-auto">
        
        <!-- Text Content -->
        <div class="w-full lg:w-1/2 space-y-8 relative z-10">
          <div class="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 shadow-sm backdrop-blur-md">
            <span class="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span class="text-secondary font-bold text-xs uppercase tracking-[0.2em]">{tag}</span>
          </div>
          
          <h1 class="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight drop-shadow-sm">
            {title1} <br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-secondary-dark italic">{title2}</span>
          </h1>
          
          <p class="text-xl text-slate-600 font-medium leading-relaxed max-w-xl">
            {desc}
          </p>

          <div class="flex flex-wrap gap-4 pt-4">
             <button onclick="window.location.href='../contact.html'" class="btn-gold">
               Consult an Expert
               <span class="material-symbols-outlined text-xl">arrow_forward</span>
             </button>
          </div>
        </div>

        <!-- Image Gallery/Showcase -->
        <div class="w-full lg:w-1/2 relative group">
          <!-- Background Glow -->
          <div class="absolute inset-0 bg-gradient-to-tr from-secondary/30 to-primary/30 rounded-[3rem] blur-3xl group-hover:blur-2xl transition-all duration-700 opacity-50"></div>
          
          <!-- Main Image Container -->
          <div class="relative glass p-2 rounded-[3rem] transform transition-transform duration-700 hover:scale-[1.02]">
            <div class="relative rounded-[2.5rem] overflow-hidden bg-white">
              <img src="{image_src}" alt="Insurance Professional" class="w-full h-[500px] object-cover object-center" />
              
              <!-- Gradient Overlay for premium feel -->
              <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent"></div>
              
              <!-- Floating Badge -->
              <div class="absolute bottom-6 left-6 right-6 glass-dark border border-white/20 rounded-2xl p-4 flex items-center gap-4">
                 <div class="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined text-white">security</span>
                 </div>
                 <div>
                    <p class="text-white font-bold text-sm">100% Secure</p>
                    <p class="text-white/80 text-xs font-medium">IRDAI Approved Plans</p>
                 </div>
              </div>
            </div>
          </div>
          
          <!-- Decorative Floating Element -->
          <div class="absolute -top-6 -right-6 glass rounded-2xl p-4 shadow-2xl animate-bounce" style="animation-duration: 3s;">
             <span class="material-symbols-outlined text-secondary text-4xl">verified</span>
          </div>
        </div>
      </div>
    </section>"""

for f in html_files:
    file_path = os.path.join(DIR, f)
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Try to match the exact pattern
    pattern = r'<!-- Hero Section -->.*?<div[^>]*class="inline-flex[^>]*>\s*(.*?)\s*</div>.*?<h1[^>]*>\s*(.*?)\s*<br\s*/>.*?<span[^>]*>\s*(.*?)\s*</span>.*?</h1>.*?<p[^>]*>\s*(.*?)\s*</p>.*?</section>'
    match = re.search(pattern, content, re.DOTALL)
    
    if match:
        tag = match.group(1).strip()
        title1 = match.group(2).strip()
        title2 = match.group(3).strip()
        desc = match.group(4).strip()
        
        # In some cases the description might have multiple lines, normalize it
        desc = re.sub(r'\s+', ' ', desc)
        
        new_hero = template.format(
            tag=tag,
            title1=title1,
            title2=title2,
            desc=desc,
            image_src=get_image(f)
        )
        
        # Replace old hero section
        new_content = re.sub(r'<!-- Hero Section -->.*?</section>', new_hero, content, flags=re.DOTALL)
        
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(new_content)
        print(f"Updated {f}")
    else:
        print(f"Pattern not found in {f}")
