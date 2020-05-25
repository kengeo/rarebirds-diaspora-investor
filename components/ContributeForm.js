import React, { Component } from "react";
import { Form, Input, Button, Message } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
// import Web3 from "web3";
// import { Router } from '../routes';

import { useRouter } from "next/router";

class ContributeForm extends Component {
   state = {
      value: "",
      errorMessage: "",
      loading: false,
   };

   onSubmit = async (event) => {
      event.preventDefault();
      const campaign = Campaign(this.props.address);
      // const PortisWallet = require("@portis/web3");
      // const Web3 = require("web3");
      // const portis = new PortisWallet(
      //    "cab219bb-988f-497f-bea7-71dd2c9c07a4",
      //    "kovan"
      // );
      // console.log(portis);
      // const web3 = new Web3(portis.provider);

      // portis.onLogin((walletAddress, email) => {
      //    this.setState({ address: walletAddress, email: email });
      // });

      this.setState({ loading: true, errorMessage: "" });

      try {
         const accounts = await web3.eth.getAccounts();
         await campaign.methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei(this.state.value, "ether"),
         });
         // Router.replaceRoute(`/campaigns/${this.props.address}`);
         const router = useRouter();
         router.push(`/campaigns/${this.props.address}`);
      } catch (err) {
         this.setState({ errorMessage: err.message });
      }
      this.setState({ loading: false, value: "" });
   };

   render() {
      return (
         <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Form.Field>
               <label>Amount to Contribute</label>
               <Input
                  value={this.state.value}
                  onChange={(event) =>
                     this.setState({ value: event.target.value })
                  }
                  label="ether"
                  labelPosition="right"
               />
            </Form.Field>
            <Message error header="Oops!" content={this.state.errorMessage} />
            <Button primary loading={this.state.loading}>
               Contribute!
            </Button>
         </Form>
      );
   }
}

export default ContributeForm;
