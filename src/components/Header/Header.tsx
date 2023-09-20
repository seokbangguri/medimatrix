import React from "react";
import image from "../../assets/medimatrix_logo_black.svg";
import Button from "../Button/Button";


const Header = () => {

  return (
    <header className="fixed top-0 z-30 w-screen bg-white mx-auto">
      <div className="lg:max-w-[1445px] flex items-center justify-between py-5 px-5 lg:px-10 mx-auto">
        <div className="flex items-center justify-center ">
          <a href="/">
            <img
              className="pt-1"
              src={image}
              width={190}
              height={60}
              alt="logo"
            />
          </a>
        </div>
        <nav className="flex items-center gap-8 md:gap-10 lg:gap-12">
          <div className="flex items-center gap-4 md:gap-6 lg:gap-9">
            <a
              href="/"
              className="text-lg font-semibold text-black tracking-wider hover:opacity-75  border-transparent border-b-[2px] hover:border-button-green hover:scale-105 duration-150"
            >
              Home
            </a>
            <a
              href="#products"
              onClick={(e) => {
                e.preventDefault(); // 기본 동작(링크 이동)을 막습니다.
                const targetElement = document.querySelector("#products");
                if (targetElement instanceof HTMLElement) {
                  const targetPosition = targetElement.offsetTop; // 원하는 위치를 조정하세요.
                  window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth", // 부드럽게 스크롤합니다.
                  });
                }
              }}
              className="text-lg font-semibold text-black tracking-wider hover:opacity-70  border-transparent border-b-[2px] hover:border-button-green hover:scale-105 duration-150"
            >
              Products
            </a>
            <a
              href="/"
              className="text-lg font-semibold text-black tracking-wider hover:opacity-70  border-transparent border-b-[2px] hover:border-button-green hover:scale-105 duration-150"
            >
              About Us
            </a>
            <a
              href="/"
              className="text-lg font-semibold text-black tracking-wider hover:opacity-70  border-transparent border-b-[2px] hover:border-button-green hover:scale-105 duration-150"
            >
              News
            </a>
            <a
              href="#contact"
              className="text-lg font-semibold text-black tracking-wider hover:opacity-70  border-transparent border-b-[2px] hover:border-button-green hover:scale-105 duration-150"
            >
              Contact
            </a>
          </div>
          <a href="/signup">
            <Button apperance="custom" >Sign Up</Button>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
