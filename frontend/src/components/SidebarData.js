import React from 'react';
//import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { FaExclamation } from "react-icons/fa";

export const SidebarData = [
  {
    title: 'Home',
    path: '/home',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Donation History',
    path: '/donationhistory',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Update Last Donation History',
    path: '/updatedonationhistory',
    icon: <IoIcons.IoIosPaper/>,
    cName: 'nav-text'
  },
  {
    title: 'About',
    path: '/about',
    icon: <FaExclamation />,
    cName: 'nav-text'
  },
];