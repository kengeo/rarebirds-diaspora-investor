import React, { Component } from "react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import { Card, Grid, Button } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
//import { Link } from "../../routes";
import Link from "next/link";
// import ProfileHover from "profile-hover";

class CampaignShow extends Component {
   static async getInitialProps(props) {
      const campaign = Campaign(props.query.address);
      const summary = await campaign.methods.getSummary().call();

      return {
         minimumContribution: summary[0],
         balance: web3.utils.toBN(summary[1]),
         requestsCount: summary[2],
         approversCount: summary[3],
         manager: summary[4],
         address: props.query.address,
      };
   }

   // componentDidMount() {
   //    const
   // }

   renderCards() {
      const {
         minimumContribution,
         balance,
         requestsCount,
         approversCount,
         manager,
      } = this.props;

      // const MyComponent = () => <ProfileHover address={manager} />;

      const items = [
         {
            header: manager,
            meta: "Address of Manager",
            description:
               "The manager created this campaign and can create requests to withdraw money",
            style: { overflowWrap: "break-word" },
         },
         {
            header: web3.utils.fromWei(balance, "ether").toString(),
            meta: "Aave Balance (ether)",
            description:
               "The balance is how much money this campaign has left. It is stored in an interest-bearing account until it is completely drawn down.",
            style: { overflowWrap: "break-word" },
         },
         {
            header: minimumContribution,
            meta: "Minimum Contribution (wei)",
            description:
               "You must contribute at least this much wei to become an approver",
            style: { overflowWrap: "break-word" },
         },
         {
            header: requestsCount,
            meta: "Number of requests",
            description:
               "A request tries to withdraw money from the contract. Requests must be approved by approvers.",
            style: { overflowWrap: "break-word" },
         },
         {
            header: approversCount,
            meta: "Number of Approvers",
            description:
               "Number of people who have already donated to this campaign",
            style: { overflowWrap: "break-word" },
         },
      ];

      return <Card.Group items={items} />;
   }

   render() {
      return (
         <Layout>
            <h3>Campaign Details</h3>
            <Grid>
               <Grid.Row>
                  <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
                  <Grid.Column width={6}>
                     <ContributeForm address={this.props.address} />
                     <br />
                     <hr />
                     <br />
                     <Link href={`/campaigns/${this.props.address}/requests`}>
                        <a>
                           <Button primary>View Withdrawal Requests</Button>
                        </a>
                     </Link>
                  </Grid.Column>
               </Grid.Row>
               {/* <Grid.Row>
                  <Grid.Column>
                     <Link href={`/campaigns/${this.props.address}/requests`}>
                        <a>
                           <Button primary>View Requests</Button>
                        </a>
                     </Link>
                  </Grid.Column>
               </Grid.Row> */}
            </Grid>
         </Layout>
      );
   }
}

export default CampaignShow;
