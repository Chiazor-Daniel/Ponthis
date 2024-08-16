
import { useState, useEffect,  useCallback } from "react";
import { useRouter } from 'next/router'
import Image from 'next/image';
function HeaderThree() {
  const router = useRouter()
  const [scrollTop, setScrollTop] = useState(0);
  
  //........... animation.....

   // =================== Change image path start ================== //
   const changeImage = useCallback((themeMode = 'light')=> {

    const icon = document.querySelector('#btnSwitch img');
  
  
    if (themeMode === "dark") {
  
        icon.src = 'images/icon/sun.svg';
        var images = document.querySelectorAll('img.dark');
  
        for (var i = 0; i < images.length; i++) {
            var oldSrc = images[i].src;
            oldSrc = oldSrc.replace("-dark.", ".");
            var oldIndex = oldSrc.lastIndexOf(".");
            var baseName = oldSrc.slice(0, oldIndex);
            var extension = oldSrc.slice(oldIndex);
            var newSrc = baseName + "-dark" + extension;
            images[i].src = newSrc;
        }
    } else {
        icon.src = 'images/icon/moon.svg';
        var images = document.querySelectorAll('img.dark');
  
        for (var i = 0; i < images.length; i++) {
            var oldSrc = images[i].src;
            var newSrc = oldSrc.replace("-dark.", ".");
            images[i].src = newSrc;
        }
    }
  
  },[])

// =================== Change image path end ================== //

const updateThemeColor = useCallback((themeMode = 'light') => {

  const colorSwitcher = document.getElementById('btnSwitch');

  document.documentElement.setAttribute('data-bs-theme', themeMode);
  localStorage.setItem('theme', themeMode)

  if (themeMode === 'dark') {
    colorSwitcher.classList.add('dark-switcher');

  } else {
    colorSwitcher.classList.remove('dark-switcher');
  }

  changeImage(themeMode);

}, [changeImage]);

const toggleTheme = () => {


    const theme = localStorage.getItem('theme');

    if (theme && theme === 'dark') {

        updateThemeColor('light');

    } else {
        updateThemeColor('dark');

    }
 
  };
// =================== light and dark start ================== //

function switchThemeByUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const theme = urlParams.get('theme');

  if (theme) {
    localStorage.setItem("theme", theme);
  }

}

// =================== light and dark end ================== //
  useEffect(() => {

    switchThemeByUrl();
    updateThemeColor(localStorage.getItem('theme'))
  
    
  }, [router.query.theme, updateThemeColor]);

 
  useEffect(()=>{
    setScrollTop(window.scrollY)
  }, [scrollTop])



  return (
    <>
    {/* <!-- ===============>> light&dark switch start here <<================= --> */}
          
    <div className="lightdark-switch" onClick={toggleTheme}>
              <span
                className="switch-btn"
                id="btnSwitch"
              >
                  <Image
                    src="images/icon/moon.svg"
                    alt="light-dark-switchbtn"
                    className="swtich-icon"
                    width={20}
                    height={20}
                  />
              </span>
    </div>
    </>
  );
}

export default HeaderThree;