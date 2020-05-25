import React from "react";
import { Menu } from "semantic-ui-react";
// import { Router } from '../../routes';
import Link from "next/link";

// import Portis from "@portis/web3";
// import Web3 from "web3";

export default () => {
   // const [portis, setPortis] = useState();

   // //const [web3, setWeb3] = useState();
   // useEffect(() => {
   //    const PortisWallet = require("@portis/web3");
   //    //const Web3 = require("web3");
   //    const portis = new PortisWallet(
   //       "cab219bb-988f-497f-bea7-71dd2c9c07a4",
   //       "kovan",
   //       {
   //          scope: ["email"],
   //       }
   //    );
   //    //const web3 = new Web3(portis.provider);
   //    setPortis(portis);

   //    // portis.onLogin((walletAddress, email) => {
   //    //    document.getElementById("details").innerHTML = `
   //    //    <div> Wallet Address: ${walletAddress} </div>
   //    //    <div> Email: ${email} </div>
   //    //  `;
   //    // });
   //    //setWeb3(web3);
   //    // console.log(portis);
   //    // Update the document title using the browser API
   // }, []);

   return (
      <Menu style={{ marginTop: "10px" }}>
         <Link href="/">
            <a className="item">Rare Birds</a>
         </Link>
         <Menu.Menu position="left">
            <Link href="/campaigns/new">
               <a className="item">+</a>
            </Link>
         </Menu.Menu>
         <Menu.Menu position="right">
            {/* {portis && portis.isLoggedIn() ? (
               <a
                  onClick={() =>
                     portis.logout(() => {
                        setPortis(false);
                     })
                  }
                  className="item"
               >
                  Log Out <div id="details"></div>
               </a>
            ) : (
               <a onClick={() => portis.showPortis()} className="item">
                  Log In
               </a>
            )} */}
            {/* <a onClick={() => portis.showPortis()} className="item">
               Show Portis
            </a> */}
         </Menu.Menu>
      </Menu>
   );
};
