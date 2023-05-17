import React from "react";
import { useEffect, useState } from "react";
import { ConnectButton, useWalletKit } from "@mysten/wallet-kit";
import { Link } from "react-router-dom";
import { useStakings } from "../../context";
import { useGetBalance } from "../../hooks";
import { OBJECT_RECORD } from "../../config";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export const Header = (props) => {
  const { currentAccount } = useWalletKit();
  const [address, setAddress] = useState("");

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { state } = useStakings();
  useEffect(() => {
    if (currentAccount?.address) {
      let tempAddr = currentAccount?.address;
      setAddress(tempAddr.slice(0, 4) + "..." + tempAddr.slice(-4));
    }
  }, [currentAccount]);

  useGetBalance(currentAccount?.address || OBJECT_RECORD.ADDRESSZERO, 0);
  return (
    <div className="fixed top-0 left-0 w-full min-h-60 md:min-h-80 lg:h-90 px-[8vw] flex flex-row-reverse mm:flex-row gap-50 items-center justify-between mm:justify-end bg-bg z-10">
      <div
        className="w-30 h-30 cursor-pointer block mm:hidden"
        onClick={handleClick}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <svg viewBox="0 0 48 48">
          <path d="M41,14H7a2,2,0,0,1,0-4H41A2,2,0,0,1,41,14Z" fill="#6f7380" />
          <path d="M41,26H7a2,2,0,0,1,0-4H41A2,2,0,0,1,41,26Z" fill="#6f7380" />
          <path d="M41,38H7a2,2,0,0,1,0-4H41A2,2,0,0,1,41,38Z" fill="#6f7380" />
        </svg>
      </div>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          style: {
            backgroundColor: "#232358", // set background color
            color: "white",
            width: "200px",
            display: "flex",
            justifyContent: "center",
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Link to="/">Stake</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/airdrop">Airdrop</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/referral">Referral</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/doc">Doc</Link>
        </MenuItem>
      </Menu>

      <div className="hidden mm:flex flex-row gap-10 md:gap-20 lg:gap-30">
        <span className="text-12 md:text-15 font-semibold cursor-pointer">
          <Link to="/">Stake</Link>
        </span>
        <span className="text-12 md:text-15 font-semibold cursor-pointer">
          <Link to="/airdrop">Airdrop</Link>
        </span>
        <span className="text-12 md:text-15 font-semibold cursor-pointer">
          <Link to="/referral">Referral</Link>
        </span>
        <span className="text-12 md:text-15 font-semibold cursor-pointer">
          <Link
            to="https://ezfi.gitbook.io/liquidify/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Doc
          </Link>
        </span>
      </div>

      <div className="socials-link hidden md:flex flex-row gap-10 md:gap-15 lg:gap-20">
        <Link
          to="https://discord.gg/Dh94Qx9a"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg viewBox="0 0 17 14">
            <path d="M14.2554 1.71958C13.2025 1.22875 12.0625 0.872496 10.875 0.666662C10.8646 0.666329 10.8542 0.668283 10.8447 0.672387C10.8351 0.67649 10.8265 0.682643 10.8196 0.690413C10.6771 0.951663 10.5108 1.29208 10.4 1.55333C9.14047 1.36333 7.85955 1.36333 6.60001 1.55333C6.48918 1.28416 6.32293 0.951663 6.17251 0.690413C6.1646 0.674579 6.14085 0.666662 6.11709 0.666662C4.92959 0.872496 3.79751 1.22875 2.73668 1.71958C2.72876 1.71958 2.72085 1.7275 2.71293 1.73541C0.559595 4.9575 -0.0341553 8.09249 0.258761 11.1958C0.258761 11.2117 0.266678 11.2275 0.282511 11.2354C1.70751 12.2804 3.0771 12.9137 4.43085 13.3333C4.4546 13.3412 4.47834 13.3333 4.48626 13.3175C4.80293 12.8821 5.08793 12.4229 5.33335 11.94C5.34918 11.9083 5.33335 11.8767 5.30168 11.8687C4.85043 11.6946 4.42293 11.4887 4.00335 11.2512C3.97168 11.2354 3.97168 11.1879 3.99543 11.1642C4.08251 11.1008 4.1696 11.0296 4.25668 10.9662C4.27251 10.9504 4.29626 10.9504 4.3121 10.9583C7.03543 12.2012 9.97251 12.2012 12.6642 10.9583C12.68 10.9504 12.7038 10.9504 12.7196 10.9662C12.8067 11.0375 12.8938 11.1008 12.9808 11.1721C13.0125 11.1958 13.0125 11.2433 12.9729 11.2592C12.5613 11.5046 12.1258 11.7025 11.6746 11.8767C11.6429 11.8846 11.635 11.9242 11.6429 11.9479C11.8963 12.4308 12.1813 12.89 12.49 13.3254C12.5138 13.3333 12.5375 13.3412 12.5613 13.3333C13.9229 12.9137 15.2925 12.2804 16.7175 11.2354C16.7333 11.2275 16.7413 11.2117 16.7413 11.1958C17.0896 7.60958 16.1633 4.49833 14.2871 1.73541C14.2792 1.7275 14.2713 1.71958 14.2554 1.71958ZM5.74501 9.30374C4.9296 9.30374 4.24876 8.55166 4.24876 7.62541C4.24876 6.69916 4.91376 5.94708 5.74501 5.94708C6.58418 5.94708 7.24918 6.70708 7.24126 7.62541C7.24126 8.55166 6.57626 9.30374 5.74501 9.30374ZM11.2629 9.30374C10.4475 9.30374 9.76668 8.55166 9.76668 7.62541C9.76668 6.69916 10.4317 5.94708 11.2629 5.94708C12.1021 5.94708 12.7671 6.70708 12.7592 7.62541C12.7592 8.55166 12.1021 9.30374 11.2629 9.30374Z" />
          </svg>
        </Link>

        <Link
          to="https://twitter.com/siphonlab"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg viewBox="0 0 17 15">
            <path d="M16.7808 2.25C16.1713 2.52708 15.5142 2.70916 14.8333 2.79625C15.53 2.37666 16.0683 1.71166 16.3217 0.912081C15.6646 1.30791 14.9363 1.585 14.1683 1.74333C13.5429 1.0625 12.6642 0.666664 11.6667 0.666664C9.80626 0.666664 8.28626 2.18666 8.28626 4.06291C8.28626 4.33208 8.31793 4.59333 8.37335 4.83875C5.55501 4.69625 3.04543 3.3425 1.37501 1.29208C1.08209 1.79083 0.915844 2.37666 0.915844 2.99416C0.915844 4.17375 1.50959 5.21875 2.42793 5.8125C1.86584 5.8125 1.34334 5.65416 0.884178 5.41666V5.44041C0.884178 7.08708 2.05584 8.46458 3.60751 8.77333C3.10934 8.90966 2.58634 8.92863 2.07959 8.82875C2.29462 9.50363 2.71573 10.0942 3.28373 10.5173C3.85174 10.9405 4.53807 11.175 5.24626 11.1879C4.0458 12.1383 2.55776 12.652 1.02668 12.6446C0.757511 12.6446 0.488344 12.6287 0.219177 12.5971C1.72334 13.5629 3.51251 14.125 5.42834 14.125C11.6667 14.125 15.0946 8.9475 15.0946 4.45875C15.0946 4.30833 15.0946 4.16583 15.0867 4.01541C15.7517 3.54041 16.3217 2.93875 16.7808 2.25Z" />
          </svg>
        </Link>
        <Link
          to="https://medium.com/@siphonlab"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg viewBox="0 0 15 16">
            <path d="M0 0.5V15.5H15V0.5H0ZM12.4615 4.05395L11.6569 4.82533C11.6229 4.85128 11.5966 4.88599 11.5809 4.92575C11.5651 4.9655 11.5605 5.00879 11.5674 5.05099V10.7181C11.553 10.8039 11.5875 10.8911 11.6569 10.9438L12.4424 11.7151V11.8845H8.49112V11.7151L9.30493 10.925C9.38487 10.8451 9.38487 10.8214 9.38487 10.6993V6.11875L7.12204 11.8658H6.81612L4.18158 6.11875V9.97072C4.15954 10.1326 4.21349 10.2957 4.3273 10.4128L5.38586 11.6967V11.8661H2.38454V11.6967L3.44309 10.4128C3.55625 10.2954 3.60691 10.1313 3.57961 9.97072V5.51645C3.59211 5.39276 3.54507 5.2704 3.45263 5.18717L2.51184 4.05362V3.88421H5.43322L7.69145 8.83651L9.67665 3.88421H12.4615V4.05395Z" />
          </svg>
        </Link>
        <Link
          to="https://github.com/SmartDev-0205/SUI-Staking"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg viewBox="0 0 17 16">
            <path d="M8.50004 0.0833282C7.46041 0.0833282 6.43096 0.288099 5.47046 0.685949C4.50997 1.0838 3.63724 1.66694 2.90211 2.40207C1.41745 3.88673 0.583374 5.90037 0.583374 8C0.583374 11.4992 2.85546 14.4679 5.99837 15.5208C6.39421 15.5842 6.52087 15.3387 6.52087 15.125V13.7871C4.32796 14.2621 3.86087 12.7262 3.86087 12.7262C3.49671 11.8079 2.98212 11.5625 2.98212 11.5625C2.26171 11.0717 3.03754 11.0875 3.03754 11.0875C3.82921 11.1429 4.24879 11.9029 4.24879 11.9029C4.93754 13.1062 6.10129 12.75 6.55254 12.56C6.62379 12.0454 6.82962 11.6971 7.05129 11.4992C5.29379 11.3012 3.44921 10.6204 3.44921 7.60416C3.44921 6.72541 3.75004 6.02083 4.26462 5.45875C4.18546 5.26083 3.90837 4.4375 4.34379 3.36875C4.34379 3.36875 5.00879 3.155 6.52087 4.17625C7.14629 4.00208 7.82712 3.915 8.50004 3.915C9.17296 3.915 9.85379 4.00208 10.4792 4.17625C11.9913 3.155 12.6563 3.36875 12.6563 3.36875C13.0917 4.4375 12.8146 5.26083 12.7355 5.45875C13.25 6.02083 13.5509 6.72541 13.5509 7.60416C13.5509 10.6283 11.6984 11.2933 9.93296 11.4912C10.218 11.7367 10.4792 12.2196 10.4792 12.9558V15.125C10.4792 15.3387 10.6059 15.5921 11.0096 15.5208C14.1525 14.46 16.4167 11.4992 16.4167 8C16.4167 6.96036 16.2119 5.93091 15.8141 4.97042C15.4162 4.00992 14.8331 3.1372 14.098 2.40207C13.3628 1.66694 12.4901 1.0838 11.5296 0.685949C10.5691 0.288099 9.53967 0.0833282 8.50004 0.0833282Z" />
          </svg>
        </Link>
      </div>

      <div className="flex justify-between items-center gap-10 bg-[#4282a8] rounded-md">
        {!!currentAccount && (
          <div className="flex justify-between items-center gap-10  pl-10 rounded-md">
            <span className="text-12 md:text-15 font-semibold cursor-pointer">
              {state["balance"]}
            </span>
            <svg
              style={{ width: 20, height: 30 }}
              viewBox="0 0 185 269"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.506 222.289C20.4894 236.463 32.0943 248.258 46.1319 256.466C60.1694 264.674 76.1348 269 92.3925 269C108.65 269 124.616 264.674 138.653 256.466C152.691 248.258 164.296 236.463 172.279 222.289C180.472 208.088 184.785 191.978 184.785 175.58C184.785 159.182 180.472 143.073 172.279 128.872L102.017 5.62721C101.055 3.91963 99.6572 2.49867 97.9659 1.50988C96.2747 0.521085 94.3512 0 92.3925 0C90.4339 0 88.5104 0.521085 86.8191 1.50988C85.1279 2.49867 83.7296 3.91963 82.7676 5.62721L12.506 128.872C4.31318 143.073 0 159.182 0 175.58C0 191.978 4.31318 208.088 12.506 222.289V222.289ZM72.5998 64.2605L87.5801 37.9825C88.0611 37.1287 88.7602 36.4183 89.6058 35.9239C90.4514 35.4295 91.4132 35.1689 92.3925 35.1689C93.3719 35.1689 94.3336 35.4295 95.1792 35.9239C96.0249 36.4183 96.724 37.1287 97.205 37.9825L154.836 139.073C160.01 148.036 163.217 157.999 164.245 168.299C165.273 178.598 164.098 188.999 160.798 198.81C160.081 195.466 159.095 192.185 157.85 189C149.889 168.655 131.89 152.954 104.341 142.334C85.401 135.058 73.3107 124.357 68.3981 110.524C62.0711 92.7025 68.6797 73.2632 72.5998 64.2605ZM47.0552 109.068L29.9489 139.073C23.5444 150.173 20.1727 162.765 20.1727 175.583C20.1727 188.402 23.5444 200.994 29.9489 212.094C35.1261 221.273 42.2588 229.199 50.8406 235.308C59.4225 241.418 69.2431 245.562 79.6051 247.446C89.9671 249.33 100.616 248.908 110.797 246.209C120.978 243.511 130.44 238.602 138.512 231.832C142.973 220.418 143.132 207.77 138.96 196.248C133.114 181.548 119.04 169.813 97.1304 161.361C72.3646 151.848 56.2763 136.995 49.317 117.229C48.3797 114.563 47.624 111.837 47.0552 109.068V109.068Z"
                fill="currentColor"
              />
            </svg>
          </div>
        )}

        <ConnectButton
          connectedText={address}
          connectText={"Connect Wallet"}
          className="connect-btn px-12 md:px-15 py-5 md:py-12 text-12 md:text-15 rounded-md cursor-pointer"
        />
      </div>
    </div>
  );
};
