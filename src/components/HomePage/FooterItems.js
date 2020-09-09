import React from 'react';
import styled from 'styled-components';
// Resources
import HelpIcon from '@material-ui/icons/Help';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import OndemandVideoOutlinedIcon from '@material-ui/icons/OndemandVideoOutlined';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import SecurityIcon from '@material-ui/icons/Security';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import CopyrightIcon from '@material-ui/icons/Copyright';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import BarChartIcon from '@material-ui/icons/BarChart';

// Developers
import CodeIcon from '@material-ui/icons/Code';
import ExtensionIcon from '@material-ui/icons/Extension';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

// Campaigns
import WifiTetheringIcon from '@material-ui/icons/WifiTethering';
import LinkIcon from '@material-ui/icons/Link';
import InboxIcon from '@material-ui/icons/Inbox';
import ListAltIcon from '@material-ui/icons/ListAlt';

// Contact
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import YouTubeIcon from '@material-ui/icons/YouTube';

const ResourcesFooterItems = [
  {
    id: 1,
    icon: <HelpIcon />,
    name: 'About',
    link: 'https://withkoji.com/resources/about',
  },
  {
    id: 2,
    icon: <ShareOutlinedIcon />,
    name: 'Plugins',
    link: 'https://withkoji.com/resources/plugins',
  },
  {
    id: 3,
    icon: <OndemandVideoOutlinedIcon />,
    name: 'Tutorials',
    link: 'https://www.youtube.com/channel/UCc5jM6NwVNQc7b5APigEsMw',
  },
  {
    id: 4,
    icon: <RssFeedIcon />,
    name: 'Blog',
    link: 'https://blog.withkoji.com/',
  },
  {
    id: 5,
    icon: <SecurityIcon />,
    name: 'Privacy policy',
    link: 'https://withkoji.com/resources/privacy',
  },
  {
    id: 6,
    icon: <AccessibilityNewIcon />,
    name: 'Terms of use',
    link: 'https://withkoji.com/resources/terms',
  },
  {
    id: 7,
    icon: <CopyrightIcon />,
    name: 'Copyright policy',
    link: 'https://withkoji.com/resources/copyright',
  },
  {
    id: 8,
    icon: <PermMediaIcon />,
    name: 'Media kit',
    link: 'https://drive.google.com/drive/folders/1us80XaJqpoj408HX4TeXxbPIc3ZjtM5y',
  },
  {
    id: 9,
    icon: <BarChartIcon />,
    name: 'Status',
    link: 'http://www.kojistatus.com/',
  },

];

const DevelopersFooterItems = [
  {
    id: 1,
    icon: <CodeIcon />,
    name: 'Developer documentation',
    link: 'https://developer.withkoji.com/',
  },
  {
    id: 2,
    icon: <ExtensionIcon />,
    name: 'Scaffolds',
    link: 'https://withkoji.com/create/scaffolds',
  },
  {
    id: 3,
    icon: <PhotoLibraryIcon />,
    name: 'Create an asset pack',
    link: 'https://www.youtube.com/watch?v=Ka4FYGHbiAM',
  },
  {
    id: 4,
    icon: <DeveloperBoardIcon />,
    name: 'Create an extension',
    link: 'https://developer.withkoji.com/', // This is not correct, change to correct link
  },
  {
    id: 5,
    icon: <MonetizationOnIcon />,
    name: 'My monetized assets',
    link: 'https://withkoji.com/partners/registered-assets',
  },

];

const CampaignsFooterItems = [
  {
    id: 1,
    icon: <WifiTetheringIcon />,
    name: 'Browse campaigns',
    link: 'https://withkoji.com/campaigns',
  },
  {
    id: 2,
    icon: <LinkIcon />,
    name: 'My campaign links',
    link: 'https://withkoji.com/campaigns/activity/posts',
  },
  {
    id: 3,
    icon: <InboxIcon />,
    name: 'My campaign submissions',
    link: 'https://withkoji.com/campaigns/activity/submissions',
  },
  {
    id: 4,
    icon: <ListAltIcon />,
    name: 'Campaign manager',
    link: 'https://withkoji.com/campaigns/sponsor',
  },
];

const DiscordIcon = styled.img`
    display: flex;
    flex-direction: row !important;
    width: 21px;
    margin-right: 0;
`;

const ContactFooterItems = [
  {
    id: 1,
    icon: <DiscordIcon src="/images/discordIcon.png" />,
    name: '',
    href: 'https://discord.com/invite/eQuMJF6',
  },
  {
    id: 2,
    icon: <TwitterIcon style={{ fontSize: 18 }} />,
    name: '',
    href: 'https://twitter.com/madewithkoji',
  },
  {
    id: 3,
    icon: <FacebookIcon />,
    name: '',
    href: 'https://www.facebook.com/madewithkoji/',
  },
  {
    id: 4,
    icon: <LinkedInIcon />,
    name: '',
    href: 'https://www.linkedin.com/company/withkoji/',
  },
  {
    id: 5,
    icon: <YouTubeIcon />,
    name: '',
    href: 'https://www.youtube.com/channel/UCc5jM6NwVNQc7b5APigEsMw',
  },

];

export { ResourcesFooterItems, DevelopersFooterItems, CampaignsFooterItems, ContactFooterItems };
