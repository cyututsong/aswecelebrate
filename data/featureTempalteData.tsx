
import { LuMonitorSmartphone } from "react-icons/lu";
import { FaVideo } from "react-icons/fa";
import { RiMultiImageLine } from "react-icons/ri";
import { HiUsers } from "react-icons/hi";


export const featuresItems = [
    { 
      id:'device',
      icon: <LuMonitorSmartphone size={30} />,
      title: 'All Device View' ,
      description: 'Optimized for seamless viewing on mobile, tablet, and desktop screens'
    },
    { 
      id:'video',
      icon: <FaVideo size={30} />,
      title: 'Pre-Wedding Video' ,
      description: 'Embed your cinematic love story directly into your digital invitation'
    },
    { 
      id:'photos',
      icon: <RiMultiImageLine size={30} />,
      title: 'Prenup Photos' ,
      description: 'Display your beautiful engagement gallery with elegant zoom-in effects.'
    },
    { 
      id:'entrourage',      
      icon: <HiUsers size={30} />,
      title: 'The Entourage' ,
      description: 'Showcase your support system with detailed bridal party profiles'
    },
];
