import { useState, useEffect, useRef, useCallback } from "react";
import imagetest1 from "../../assets/test1.svg";
import userIcon from '../../assets/user.svg'
import Button from "../Button/Button";
import { verifyToken } from "../../auth/auth";
import { Link } from "react-router-dom";
import { useOutsideClick } from "./useOutsideClick";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from 'react-i18next';
import MobileMenu from "./MobileMenu";

const Header = () => {
  const { t } = useTranslation();
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState('');
  const sortDropdownRef = useRef<HTMLDivElement>(null);
  const [isSortActive, setIsSortActive] = useOutsideClick(sortDropdownRef, false);

  const onClickSortBtn = useCallback(() => {
    setIsSortActive(prev => !prev);
  }, [setIsSortActive]);


  useEffect(() => {
    verifyToken().then(decodedToken => {
      if (decodedToken) {
        setUserName(decodedToken.name);
        setRole(decodedToken.role);
      }
    });

  }, [userName]);

  function handleSignOut() {
    sessionStorage.removeItem('token');
    window.location.href = '/';
  }

  return (
    <header className="fixed top-0 z-30 w-screen bg-white mx-auto drop-shadow-md">
      <div className="container flex items-center justify-between py-3 px-3 md:px-5 mx-auto">
        <div className="flex items-center justify-center shrink-0">
          <Link to="/"
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                window.location.href = '#home';
              }
            }}>
            <img
              className="pt-1"
              src={imagetest1}
              width={190}
              height={60}
              alt="logo"
            />
          </Link>
        </div>
        <nav className="hidden lg:flex items-center ">
          {/* 헤더 home products contack 숨김 */}
          <div className="flex items-center gap-4 md:gap-6 lg:gap-9">
            <Link
              to="/#home"
              onClick={(e) => {
                if (window.location.pathname === '/') {
                  e.preventDefault();
                  window.location.href = '#home';
                }
              }}
              className="text-lg font-semibold text-black tracking-wider hover:opacity-75  border-transparent border-b-[2px] hover:border-button-green hover:scale-105 duration-150"
            >
              Home
            </Link>
            <Link
              to="/#products"
              onClick={(e) => {
                if (window.location.pathname === '/') {
                  e.preventDefault();
                  window.location.href = '#products';
                }
              }}
              className="text-lg font-semibold text-black tracking-wider hover:opacity-70  border-transparent border-b-[2px] hover:border-button-green hover:scale-105 duration-150"
            >
              Products
            </Link>
            <Link to="/#partners"
              onClick={(e) => {
                if (window.location.pathname === '/') {
                  e.preventDefault();
                  window.location.href = '#partners';
                }
              }}
              className="text-lg font-semibold text-black tracking-wider hover:opacity-70  border-transparent border-b-[2px] hover:border-button-green hover:scale-105 duration-150"
            >
              Partners
            </Link>
            <a
              href="/#contact"
              onClick={(e) => {
                if (window.location.pathname === '/') {
                  e.preventDefault();
                  window.location.href = '#contact';
                }
              }}
              className="text-lg font-semibold text-black tracking-wider hover:opacity-70  border-transparent border-b-[2px] hover:border-button-green hover:scale-105 duration-150"
            >
              Contact
            </a>
          </div>
        </nav>
        <div className="flex items-center gap-5">
          {!userName.length ? <div className="hidden lg:flex items-center gap-2">
            <Link to="/signin">
              <Button styles="text-lg font-semibold rounded-xs text-black border-transparent inline-block min-w-[130px] py-2 border hover:opacity-75 uppercase" >{t('signin')}</Button>
            </Link>
            <Link to="/signup">
              <Button appearance="custom" styles="uppercase" >{t('signup')}</Button>
            </Link>
          </div> :
            <div className="relative inline-block text-left">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClickSortBtn();
                }}
                className="px-8 py-2 flex items-center  text-black rounded-md focus:outline-none focus:ring focus:ring-button-green hover:opacity-75"
              >
                <img src={userIcon} alt="user" width={20} height={20} />
                <span className="ml-2 w-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-6 w-6">
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd" />
                  </svg>
                </span>
              </button>
              {isSortActive && (
                <div ref={sortDropdownRef} className="absolute right-0 mt-6 w-40 bg-white drop-shadow-xl rounded-sm  overflow-hidden">
                  <ul className="list-inside">
                    <li className="py-2 px-4 font-semibold">{userName}님</li>
                    <a href="/setting"><li className="p-2 px-4 hover:bg-neutral-200 cursor-pointer border-t border-slate-400">{t('mypage')}</li></a>
                    {role === 'therapists' ?
                      <a href="/results"><li className="p-2 px-4 hover:bg-neutral-200 cursor-pointer">{t('patientMan')}</li></a> :
                      <a href="/admin"><li className="p-2 px-4 hover:bg-neutral-200 cursor-pointer">{t('therapistMan')}</li></a>
                    }
                    <li className="p-2 px-4 hover:bg-neutral-200 cursor-pointer" onClick={handleSignOut}>{t('logout')}</li>
                  </ul>
                </div>
              )}
            </div>
          }

          <LanguageSwitcher />
          <div className=" z-50">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
