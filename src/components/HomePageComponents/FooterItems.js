import React from "react"
import styled from 'styled-components';
//Resources
import HelpIcon from '@material-ui/icons/Help';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import OndemandVideoOutlinedIcon from '@material-ui/icons/OndemandVideoOutlined';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import SecurityIcon from '@material-ui/icons/Security';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import CopyrightIcon from '@material-ui/icons/Copyright';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import BarChartIcon from '@material-ui/icons/BarChart';

const ResourcesFooterItems = [
    {
      id: 1,
      icon: [<HelpIcon style={{ fontSize: 18 }}/>],
      name: "About",
      link: "https://withkoji.com/resources/about"
    },
    {
      id: 2,
      icon: [<ShareOutlinedIcon style={{ fontSize: 18 }}/>],
      name: "Plugins",
      link: "https://withkoji.com/resources/plugins"
    },
    {
      id: 3,
      icon: [<OndemandVideoOutlinedIcon style={{ fontSize: 18 }}/>],
      name: "Tutorials",
      link: "https://www.youtube.com/channel/UCc5jM6NwVNQc7b5APigEsMw"
    },
    {
      id: 4,
      icon: [<RssFeedIcon style={{ fontSize: 18 }}/>],
      name: "Blog",
      link: "https://blog.withkoji.com/"
    },
    {
      id: 5,
      icon: [<SecurityIcon style={{ fontSize: 18 }}/>],
      name: "Privacy policy",
      link: "https://withkoji.com/resources/privacy"
    },
    {
      id: 6,
      icon: [<AccessibilityNewIcon style={{ fontSize: 18 }}/>],
      name: "Terms of use",
      link: "https://withkoji.com/resources/terms"
    },
    {
      id: 7,
      icon: [<CopyrightIcon style={{ fontSize: 18 }}/>],
      name: "Copyright policy",
      link: "https://withkoji.com/resources/copyright"
    },
    {
      id: 8,
      icon: [<PermMediaIcon style={{ fontSize: 18 }}/>],
      name: "Media kit",
      link: "https://drive.google.com/drive/folders/1us80XaJqpoj408HX4TeXxbPIc3ZjtM5y"
    },
    {
      id: 9,
      icon: [<BarChartIcon style={{ fontSize: 18 }}/>],
      name: "Status",
      link: "http://www.kojistatus.com/"
    }
    
  ];

//Developers
import CodeIcon from '@material-ui/icons/Code';
import ExtensionIcon from '@material-ui/icons/Extension';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

  const DevelopersFooterItems = [
    {
      id: 1,
      icon: [<CodeIcon style={{ fontSize: 18 }}/>],
      name: "Developer documentation",
      link: "https://developer.withkoji.com/"
    },
    {
      id: 2,
      icon: [<ExtensionIcon style={{ fontSize: 18 }}/>],
      name: "Scaffolds",
      link: "https://withkoji.com/create/scaffolds"
    },
    {
      id: 3,
      icon: [<PhotoLibraryIcon style={{ fontSize: 18 }}/>],
      name: "Create an asset pack",
      link: "https://www.youtube.com/watch?v=Ka4FYGHbiAM"
    },
    {
      id: 4,
      icon: [<DeveloperBoardIcon style={{ fontSize: 18 }}/>],
      name: "Create an extension",
      link: "https://developer.withkoji.com/" //This is not correct, change to correct link
    },
    {
      id: 5,
      icon: [<MonetizationOnIcon style={{ fontSize: 18 }}/>],
      name: "My monetized assets",
      link: "https://withkoji.com/partners/registered-assets"
    }
    
  ];

//Campaigns
import WifiTetheringIcon from '@material-ui/icons/WifiTethering';
import LinkIcon from '@material-ui/icons/Link';
import InboxIcon from '@material-ui/icons/Inbox';
import ListAltIcon from '@material-ui/icons/ListAlt';

  const CampaignsFooterItems = [
    {
      id: 1,
      icon: [<WifiTetheringIcon style={{ fontSize: 18 }}/>],
      name: "Browse campaigns",
      link: "https://withkoji.com/campaigns"
    },
    {
      id: 2,
      icon: [<LinkIcon style={{ fontSize: 18 }}/>],
      name: "My campaign links",
      link: "https://withkoji.com/campaigns/activity/posts"
    },
    {
      id: 3,
      icon: [<InboxIcon style={{ fontSize: 18 }}/>],
      name: "My campaign submissions",
      link: "https://withkoji.com/campaigns/activity/submissions"
    },
    {
      id: 4,
      icon: [<ListAltIcon style={{ fontSize: 18 }}/>],
      name: "Campaign manager",
      link: "https://withkoji.com/campaigns/sponsor"
    }
  ];

//Contact
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import YouTubeIcon from '@material-ui/icons/YouTube';

const DiscordIcon = styled.img`
    display: flex;
    flex-direction: row !important;
    width: 21px;
    margin-right: 0;
`;

  const ContactFooterItems = [
    {
      id: 1,
      icon: [<DiscordIcon src="/Images/discordIcon.png" />],
      name: "",
      link: "https://discord.com/invite/eQuMJF6"
    },
    {
      id: 2,
      icon: [<TwitterIcon style={{ fontSize: 18}}/>],
      name: "",
      link: "https://twitter.com/madewithkoji"
    },
    {
      id: 3,
      icon: [<FacebookIcon style={{ fontSize: 18 }}/>],
      name: "",
      link: "https://www.facebook.com/madewithkoji/"
    },
    {
      id: 4,
      icon: [<LinkedInIcon style={{ fontSize: 18 }}/>],
      name: "",
      link: "https://www.linkedin.com/company/withkoji/"
    },
    {
      id: 5,
      icon: [<YouTubeIcon style={{ fontSize: 18 }}/>],
      name: "",
      link: "https://www.youtube.com/channel/UCc5jM6NwVNQc7b5APigEsMw"
    }
    
  ];

  export {ResourcesFooterItems, DevelopersFooterItems, CampaignsFooterItems, ContactFooterItems}