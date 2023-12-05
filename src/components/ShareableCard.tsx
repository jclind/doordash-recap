import React, { useRef, useState } from 'react'
import { CopyLinkStatus, RewindData } from '../types'
import doordashLogo from '../assets/images/doordash-logo.png'
import { concatString } from '../util/concatString'
import { msToMinutes } from '../util/msToMinutes'
import * as htmlToImage from 'html-to-image'
import ShareModal from './ShareModal'
import { collection, doc, setDoc } from '@firebase/firestore'
import { db } from '../services/firestore'
import { customAlphabet } from 'nanoid'
import './ShareableCard.scss'
import { Link } from 'react-router-dom'
import { PiShareFatFill } from 'react-icons/pi'

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

// const data: RewindData = {
//   numOrders: 588,
//   topIndividualStores: [
//     {
//       store: 'Sheetz (123)',
//       totalTimesDelivered: 42,
//     },
//     {
//       store: 'Burger King (5136)',
//       totalTimesDelivered: 16,
//     },
//     {
//       store: 'Sheetz (133)',
//       totalTimesDelivered: 12,
//     },
//     {
//       store: 'Sheetz (277)',
//       totalTimesDelivered: 11,
//     },
//     {
//       store: 'Primanti Bros (Allison Park)',
//       totalTimesDelivered: 10,
//     },
//     {
//       store: 'Sheetz Drive (123)',
//       totalTimesDelivered: 10,
//     },
//     {
//       store: "Wendy's (2375)",
//       totalTimesDelivered: 10,
//     },
//     {
//       store: 'Dollar General (19485)',
//       totalTimesDelivered: 9,
//     },
//     {
//       store: "Monte Cello's Hampton",
//       totalTimesDelivered: 9,
//     },
//     {
//       store: "Cenci's Pizza Cranberry",
//       totalTimesDelivered: 9,
//     },
//     {
//       store: 'Taco Bell - 031615',
//       totalTimesDelivered: 9,
//     },
//     {
//       store: 'Burger King (4285)',
//       totalTimesDelivered: 8,
//     },
//     {
//       store: "Cenci's Pizza Wexford",
//       totalTimesDelivered: 8,
//     },
//     {
//       store: 'TEQUILA JALISCO MEXICAN RESTAURANT (William Flynn Hwy)',
//       totalTimesDelivered: 8,
//     },
//     {
//       store: 'Taco Bell (31620)',
//       totalTimesDelivered: 8,
//     },
//     {
//       store: "Applebee's 7608 RICHLAND TOWNSHIP",
//       totalTimesDelivered: 8,
//     },
//     {
//       store: "Wendy's (2380)",
//       totalTimesDelivered: 7,
//     },
//     {
//       store: "Applebee's 9671 CRANBERRY",
//       totalTimesDelivered: 7,
//     },
//     {
//       store: 'Jade palace (Gibsonia)',
//       totalTimesDelivered: 7,
//     },
//     {
//       store: 'Taco Bell - 035249',
//       totalTimesDelivered: 7,
//     },
//     {
//       store: '7-Eleven (40119)',
//       totalTimesDelivered: 6,
//     },
//     {
//       store: 'Taco Bell (33089)',
//       totalTimesDelivered: 5,
//     },
//     {
//       store: "McDonald's (23267-228, CRANBERRY TWP)",
//       totalTimesDelivered: 5,
//     },
//     {
//       store: 'Great Wall Chinese Restaurant',
//       totalTimesDelivered: 5,
//     },
//     {
//       store: 'Chick-fil-A (04067)',
//       totalTimesDelivered: 5,
//     },
//     {
//       store: 'Buffalo Wild Wings - 189',
//       totalTimesDelivered: 5,
//     },
//     {
//       store: 'Primanti Bros (Cranberry)',
//       totalTimesDelivered: 5,
//     },
//     {
//       store: 'Condado Tacos (Cranberry)',
//       totalTimesDelivered: 5,
//     },
//     {
//       store: 'Pizza Hut (033952) Marketplace -Quality Huts East',
//       totalTimesDelivered: 4,
//     },
//     {
//       store: "McDonald's (6141 - WARRENDALE)",
//       totalTimesDelivered: 4,
//     },
//     {
//       store: "McDonald's (714-WEXFORD)",
//       totalTimesDelivered: 4,
//     },
//     {
//       store: 'Sheetz (678)',
//       totalTimesDelivered: 4,
//     },
//     {
//       store: 'Taco Bell (31615)',
//       totalTimesDelivered: 4,
//     },
//     {
//       store: 'Red Robin (460)',
//       totalTimesDelivered: 4,
//     },
//     {
//       store: '732 - Noodles & Company',
//       totalTimesDelivered: 4,
//     },
//     {
//       store: 'Sheetz Drive (277)',
//       totalTimesDelivered: 4,
//     },
//     {
//       store: 'Crumbl Cookies (Cranberry Township)',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: '274-SEPHORA ROSS PARK',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Dairy Queen (DQ-17530)',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: "Arby's (1691)",
//       totalTimesDelivered: 3,
//     },
//     {
//       store: "Wendy's (10427)",
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Subway 27773-0',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'China Palace (Wexford)',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'China House',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'CHiKN',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Real Thai Cuisine (Cranberry Twp)',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Saga Steakhouse & Sushi Bar  (Route 19)',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Sheetz (521)',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Buffalo Wild Wings - Wild Burger (298)',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: '7-Eleven (36142)',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'CCC0098125 (100 Northtowne Square)',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Buffalo Wild Wings - 298',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Smokey Bones Bar & Fire Grill (Cranberry Twp - 7572)',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Sheetz - 784',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Dairy Queen (17938)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "Aladdin's Eatery - McKnight",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "Wendy's (2367)",
//       totalTimesDelivered: 2,
//     },
//     {
//       store:
//         'Panera - Flynn Restaurant Group, Pan NorCal LLC (William Flinn Highway)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "Big Shot Bob's Mars (Mars)",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Chipotle (Mackenzie Way)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Taco Bell (35249)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Chipotle (Cranberry Springs)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Chick-fil-A (03804)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Buffalo Wild Wings (189)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Firebirds Wood Fired Grill (Cranberry)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'K ASIAN BISTRO',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Carrols LLC (Butler Street)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "McDonald's (26447-ALLISON PARK)",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Mad Mex (Waterworks)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Pizza Hut (033949) Marketplace -Quality Huts East',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Sheetz (99)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Five Guys PA-0061',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Aldi Grocery Marketplace (469045)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Red Robin (470)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Giant Eagle (Freeport Road) ',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "McDonald's (24334-HOMESTEAD)",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'The Sports Grille at Cranberry (Freedom Rd)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Blaze Pizza (1320 - Cranberry)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Sheetz (617)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'The Wing Experience (@Smokey Bones)(Cranberry Twp - 7572)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Chipotle Mexican Grill - 3161',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "Pizza Joe's (#090 - Big Springs Dr)",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Taco Bell - 033089',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "Eat' N Park (Waterworks)",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Chipotle Mexican Grill - 2655',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "Applebee's (Grandview Crossing)",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'El Campesino (McKnight)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Vocelli Pizza (Cranberry)-',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "111 - DiBella's",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "Stack'd Burgers & Beer (Perry Highway)",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Buffalo Wild Wings (Grandview Crossing)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "Bruster's 0373 (Gibsonia)",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Subway 48654-0',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Walgreens (11865)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'The Burger Experience (@Smokey Bones)(Cranberry Twp - 7572)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Sheetz (115)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "Moe's Southwest Grill (100189)",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Sheetz (477)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Sheetz (631)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Pizza Hut (033977) Marketplace -Quality Huts East',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Avor Thai Restaurant (Commonwealth Dr)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Chipotle Mexican Grill - 2148',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Burger King (2869)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "Arby's (1773)",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Red Lobster - 0229 North Hills, PA',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Dairy Queen (13602)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'JJ Panda (Duncan Ave)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Walgreens (10282)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Chipotle (Cranberry Township)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Burger King (2546)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Vocelli Pizza (Allegheny Ave)-',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Sheetz (189)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Patron Mexican Grill (Cranberry)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Jersey Mike's Subs (8066)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Dollar General (8549)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "BullDawg's",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Stoke's Grill",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Jersey Mike's (Perry Highway)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Rite Aid (10905)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'PetSmart (3001)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'CVS (2449)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'GetGo (3691)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Applebee's 8664 N. HILLS VILLAGE MALL",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Taco Bell (32287)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Freshii (1236)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Chipotle (William Flinn Highway)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Penn Station East Coast Subs - Gibsonia PA - (348)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Mintt Pizza (PA-228)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Burgatory (Cranberry Township)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Target (02262)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Hong Kong Taste ((366 Butler St)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Panera - Flynn Restaurant Group, Pan NorCal LLC (Freeport Road)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'MenuSifu (333 Allegheny Avenue)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Target (02385)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Denny's (9565)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Chili's Grill & Bar (001.005.1152)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Waffles, INCaffeinated, Wexford',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Chipotle (Wexford)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Alioto’s Sports Bar & Restaurant (Grant Ave)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Dollar General (21679)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Chipotle (Freeport Road)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'MenuSifu (848 Allegheny River Boulevard)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'VERONA',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Subway 3129-0',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Patron Mexican Grill (Highland)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Piada Italian Street Food (47 -- East Liberty)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Subway (2967)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'VANDERGRIFT',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Chili's Grill & Bar (001.005.1127)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "It's Just Wings (IJW001.005.1127) (pick up at Chili's)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Dairy Queen (13599)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'CCC0115762 (3036 Freeport Road)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Arby's (1852)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Applebee's 7567 PITTSBURGH MILLS",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Chili's (Pittsburgh Mills Boulevard)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Starbucks (62593)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Aladdins Eatery - Fox Chapel',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: '18th Street Pizza (Allison Park)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "McDonald's (7246-NORTHSIDE)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'CCC0127948 (705 Allegheny Avenue)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Chipotle (Fox Chapel)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Speedway (46253)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Hello Bistro Pine',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Subway 41889-0',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Jersey Mike's (Pennsylvania 8)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Denny's (9566)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Graeter's Ice Cream (Perry Hwy)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Nothing Bundt Cakes - Cranberry Township',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Naturoll Creamery (Cranberry Township)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: '228, CRANBERRY TWP',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Emiliano's Mexican Restaurant (Cranberry)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Peppino's Pizza (Perry Hwy)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Dollar General (14690)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Bowl Market (Cranberry Twp - 7572)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'CCC0115762 (4873 State Highway 8)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Sir Pizza (Treesdale)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Bowl Market (Frazier Twp - 7634)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Applebee's (Village Center Drive)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Eat' N Park (New Kensington)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'LOWER BURRELL',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Taco Bell (33753)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Donatos (460)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Taco Bell (26114)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'CVS (2589)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'PetSmart (591)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'KFC (J625265)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Jersey Mike's Subs (8063)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Pulp Juice and Smoothie Bar-Cranberry PA',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Eat' N Park (Shaler)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "McDonald's (6492-SHALER)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'KFC - J625135',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Mad Mex - North Hills',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Wendy's (2356)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Taco Bell - 033753',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Panera MP (202305 - Perry Highway - Wexford PA)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Cracker Barrel (747)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Chick-fil-A (01583)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Moe's Southwest Grill (379)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Patron Mexican Grill',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Subway (3505)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Los Cabos Mexican Restaurant (Pittsburgh)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'CVS (7611)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Dollar General (19684)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Frank's Pizza & Chicken (Rochester Road)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Wendy's (Freeport Road)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Advance Auto Parts (via OneRail) (5312 William Flinn Highway)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Subway 65130-0',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Eat'n Park (Frankstown Road)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Cold Stone Creamery (21696)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Aldi Grocery Marketplace (469054)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Staples (1597)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Eat' N Park (Hampton Twp)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "McDonald's (24444-GIBSONIA)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'American Natural (Adair Ave)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Chipotle Mexican Grill - 3343',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Primanti Bros. (William Flinn Highway)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Tractor Supply (1162)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Anthony's Coal Fired Pizza (Cranberry)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Aviva Brick Oven (Perry Hwy)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Dunkin' (343581)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Giant Eagle (Town Center Drive)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'The Cheesecake Factory (Ross Park - 0122)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Sheetz Drive (115)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Walgreens (9675)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Arby's (1858)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Italian Oven (1075 Freedom Road)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'El Campesino (Carnegie)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Sheetz Drive (477)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Sheetz Drive (631)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Ales On 6th (E 6th Ave)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Dee Jay's BBQ Ribs & Grille (Wexford)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Mad Mex (Cranberry)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Dollar General (19008)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Taco Bell - 040070',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Wingstop - 2230',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Fresh Thyme (453)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Big Shot Bob's House of Wings (20445 Route 19)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'TEPACHE MEXICAN KITCHEN & BAR',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Starbucks - 7630',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Aldi Grocery Marketplace (469070)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Aldi Grocery Marketplace (469068)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Dollar General (15169)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Subway (31516)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Buffalo Wild Wings - Wild Burger (189)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'American Natural (Grandview Dr)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Red Robin (Pennsylvania 228)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Aladdin's Eatery - Cranberry",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Jason's Deli - PAC 197",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Sheetz Drive (133)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Carrols LLC (228)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Sheetz (123)',
//       totalTimesDelivered: 42,
//     },
//     {
//       store: 'Burger King (5136)',
//       totalTimesDelivered: 16,
//     },
//     {
//       store: 'Sheetz (133)',
//       totalTimesDelivered: 12,
//     },
//     {
//       store: 'Sheetz (277)',
//       totalTimesDelivered: 11,
//     },
//     {
//       store: 'Primanti Bros (Allison Park)',
//       totalTimesDelivered: 10,
//     },
//     {
//       store: 'Sheetz Drive (123)',
//       totalTimesDelivered: 10,
//     },
//     {
//       store: "Wendy's (2375)",
//       totalTimesDelivered: 10,
//     },
//     {
//       store: 'Dollar General (19485)',
//       totalTimesDelivered: 9,
//     },
//     {
//       store: "Monte Cello's Hampton",
//       totalTimesDelivered: 9,
//     },
//     {
//       store: "Cenci's Pizza Cranberry",
//       totalTimesDelivered: 9,
//     },
//     {
//       store: 'Taco Bell - 031615',
//       totalTimesDelivered: 9,
//     },
//     {
//       store: 'Burger King (4285)',
//       totalTimesDelivered: 8,
//     },
//     {
//       store: "Cenci's Pizza Wexford",
//       totalTimesDelivered: 8,
//     },
//     {
//       store: 'TEQUILA JALISCO MEXICAN RESTAURANT (William Flynn Hwy)',
//       totalTimesDelivered: 8,
//     },
//     {
//       store: 'Taco Bell (31620)',
//       totalTimesDelivered: 8,
//     },
//     {
//       store: "Applebee's 7608 RICHLAND TOWNSHIP",
//       totalTimesDelivered: 8,
//     },
//     {
//       store: "Wendy's (2380)",
//       totalTimesDelivered: 7,
//     },
//     {
//       store: "Applebee's 9671 CRANBERRY",
//       totalTimesDelivered: 7,
//     },
//     {
//       store: 'Jade palace (Gibsonia)',
//       totalTimesDelivered: 7,
//     },
//     {
//       store: 'Taco Bell - 035249',
//       totalTimesDelivered: 7,
//     },
//     {
//       store: '7-Eleven (40119)',
//       totalTimesDelivered: 6,
//     },
//     {
//       store: 'Taco Bell (33089)',
//       totalTimesDelivered: 5,
//     },
//     {
//       store: "McDonald's (23267-228, CRANBERRY TWP)",
//       totalTimesDelivered: 5,
//     },
//     {
//       store: 'Great Wall Chinese Restaurant',
//       totalTimesDelivered: 5,
//     },
//     {
//       store: 'Chick-fil-A (04067)',
//       totalTimesDelivered: 5,
//     },
//     {
//       store: 'Buffalo Wild Wings - 189',
//       totalTimesDelivered: 5,
//     },
//     {
//       store: 'Primanti Bros (Cranberry)',
//       totalTimesDelivered: 5,
//     },
//     {
//       store: 'Condado Tacos (Cranberry)',
//       totalTimesDelivered: 5,
//     },
//     {
//       store: 'Pizza Hut (033952) Marketplace -Quality Huts East',
//       totalTimesDelivered: 4,
//     },
//     {
//       store: "McDonald's (6141 - WARRENDALE)",
//       totalTimesDelivered: 4,
//     },
//     {
//       store: "McDonald's (714-WEXFORD)",
//       totalTimesDelivered: 4,
//     },
//     {
//       store: 'Sheetz (678)',
//       totalTimesDelivered: 4,
//     },
//     {
//       store: 'Taco Bell (31615)',
//       totalTimesDelivered: 4,
//     },
//     {
//       store: 'Red Robin (460)',
//       totalTimesDelivered: 4,
//     },
//     {
//       store: '732 - Noodles & Company',
//       totalTimesDelivered: 4,
//     },
//     {
//       store: 'Sheetz Drive (277)',
//       totalTimesDelivered: 4,
//     },
//     {
//       store: 'Crumbl Cookies (Cranberry Township)',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: '274-SEPHORA ROSS PARK',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Dairy Queen (DQ-17530)',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: "Arby's (1691)",
//       totalTimesDelivered: 3,
//     },
//     {
//       store: "Wendy's (10427)",
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Subway 27773-0',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'China Palace (Wexford)',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'China House',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'CHiKN',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Real Thai Cuisine (Cranberry Twp)',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Saga Steakhouse & Sushi Bar  (Route 19)',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Sheetz (521)',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Buffalo Wild Wings - Wild Burger (298)',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: '7-Eleven (36142)',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'CCC0098125 (100 Northtowne Square)',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Buffalo Wild Wings - 298',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Smokey Bones Bar & Fire Grill (Cranberry Twp - 7572)',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Sheetz - 784',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Dairy Queen (17938)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "Aladdin's Eatery - McKnight",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "Wendy's (2367)",
//       totalTimesDelivered: 2,
//     },
//     {
//       store:
//         'Panera - Flynn Restaurant Group, Pan NorCal LLC (William Flinn Highway)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "Big Shot Bob's Mars (Mars)",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Chipotle (Mackenzie Way)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Taco Bell (35249)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Chipotle (Cranberry Springs)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Chick-fil-A (03804)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Buffalo Wild Wings (189)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Firebirds Wood Fired Grill (Cranberry)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'K ASIAN BISTRO',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Carrols LLC (Butler Street)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "McDonald's (26447-ALLISON PARK)",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Mad Mex (Waterworks)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Pizza Hut (033949) Marketplace -Quality Huts East',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Sheetz (99)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Five Guys PA-0061',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Aldi Grocery Marketplace (469045)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Red Robin (470)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Giant Eagle (Freeport Road) ',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "McDonald's (24334-HOMESTEAD)",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'The Sports Grille at Cranberry (Freedom Rd)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Blaze Pizza (1320 - Cranberry)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Sheetz (617)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'The Wing Experience (@Smokey Bones)(Cranberry Twp - 7572)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Chipotle Mexican Grill - 3161',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "Pizza Joe's (#090 - Big Springs Dr)",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Taco Bell - 033089',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "Eat' N Park (Waterworks)",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Chipotle Mexican Grill - 2655',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "Applebee's (Grandview Crossing)",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'El Campesino (McKnight)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Vocelli Pizza (Cranberry)-',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "111 - DiBella's",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "Stack'd Burgers & Beer (Perry Highway)",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Buffalo Wild Wings (Grandview Crossing)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "Bruster's 0373 (Gibsonia)",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Subway 48654-0',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Walgreens (11865)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'The Burger Experience (@Smokey Bones)(Cranberry Twp - 7572)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Sheetz (115)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "Moe's Southwest Grill (100189)",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Sheetz (477)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Sheetz (631)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Pizza Hut (033977) Marketplace -Quality Huts East',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Avor Thai Restaurant (Commonwealth Dr)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Chipotle Mexican Grill - 2148',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Burger King (2869)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "Arby's (1773)",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Red Lobster - 0229 North Hills, PA',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Dairy Queen (13602)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'JJ Panda (Duncan Ave)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Walgreens (10282)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Chipotle (Cranberry Township)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Burger King (2546)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Vocelli Pizza (Allegheny Ave)-',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Sheetz (189)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Patron Mexican Grill (Cranberry)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Jersey Mike's Subs (8066)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Dollar General (8549)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "BullDawg's",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Stoke's Grill",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Jersey Mike's (Perry Highway)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Rite Aid (10905)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'PetSmart (3001)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'CVS (2449)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'GetGo (3691)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Applebee's 8664 N. HILLS VILLAGE MALL",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Taco Bell (32287)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Freshii (1236)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Chipotle (William Flinn Highway)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Penn Station East Coast Subs - Gibsonia PA - (348)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Mintt Pizza (PA-228)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Burgatory (Cranberry Township)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Target (02262)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Hong Kong Taste ((366 Butler St)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Panera - Flynn Restaurant Group, Pan NorCal LLC (Freeport Road)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'MenuSifu (333 Allegheny Avenue)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Target (02385)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Denny's (9565)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Chili's Grill & Bar (001.005.1152)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Waffles, INCaffeinated, Wexford',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Chipotle (Wexford)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Alioto’s Sports Bar & Restaurant (Grant Ave)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Dollar General (21679)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Chipotle (Freeport Road)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'MenuSifu (848 Allegheny River Boulevard)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'VERONA',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Subway 3129-0',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Patron Mexican Grill (Highland)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Piada Italian Street Food (47 -- East Liberty)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Subway (2967)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'VANDERGRIFT',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Chili's Grill & Bar (001.005.1127)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "It's Just Wings (IJW001.005.1127) (pick up at Chili's)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Dairy Queen (13599)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'CCC0115762 (3036 Freeport Road)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Arby's (1852)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Applebee's 7567 PITTSBURGH MILLS",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Chili's (Pittsburgh Mills Boulevard)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Starbucks (62593)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Aladdins Eatery - Fox Chapel',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: '18th Street Pizza (Allison Park)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "McDonald's (7246-NORTHSIDE)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'CCC0127948 (705 Allegheny Avenue)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Chipotle (Fox Chapel)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Speedway (46253)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Hello Bistro Pine',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Subway 41889-0',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Jersey Mike's (Pennsylvania 8)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Denny's (9566)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Graeter's Ice Cream (Perry Hwy)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Nothing Bundt Cakes - Cranberry Township',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Naturoll Creamery (Cranberry Township)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: '228, CRANBERRY TWP',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Emiliano's Mexican Restaurant (Cranberry)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Peppino's Pizza (Perry Hwy)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Dollar General (14690)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Bowl Market (Cranberry Twp - 7572)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'CCC0115762 (4873 State Highway 8)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Sir Pizza (Treesdale)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Bowl Market (Frazier Twp - 7634)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Applebee's (Village Center Drive)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Eat' N Park (New Kensington)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'LOWER BURRELL',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Taco Bell (33753)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Donatos (460)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Taco Bell (26114)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'CVS (2589)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'PetSmart (591)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'KFC (J625265)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Jersey Mike's Subs (8063)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Pulp Juice and Smoothie Bar-Cranberry PA',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Eat' N Park (Shaler)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "McDonald's (6492-SHALER)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'KFC - J625135',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Mad Mex - North Hills',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Wendy's (2356)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Taco Bell - 033753',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Panera MP (202305 - Perry Highway - Wexford PA)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Cracker Barrel (747)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Chick-fil-A (01583)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Moe's Southwest Grill (379)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Patron Mexican Grill',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Subway (3505)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Los Cabos Mexican Restaurant (Pittsburgh)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'CVS (7611)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Dollar General (19684)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Frank's Pizza & Chicken (Rochester Road)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Wendy's (Freeport Road)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Advance Auto Parts (via OneRail) (5312 William Flinn Highway)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Subway 65130-0',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Eat'n Park (Frankstown Road)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Cold Stone Creamery (21696)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Aldi Grocery Marketplace (469054)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Staples (1597)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Eat' N Park (Hampton Twp)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "McDonald's (24444-GIBSONIA)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'American Natural (Adair Ave)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Chipotle Mexican Grill - 3343',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Primanti Bros. (William Flinn Highway)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Tractor Supply (1162)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Anthony's Coal Fired Pizza (Cranberry)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Aviva Brick Oven (Perry Hwy)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Dunkin' (343581)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Giant Eagle (Town Center Drive)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'The Cheesecake Factory (Ross Park - 0122)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Sheetz Drive (115)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Walgreens (9675)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Arby's (1858)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Italian Oven (1075 Freedom Road)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'El Campesino (Carnegie)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Sheetz Drive (477)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Sheetz Drive (631)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Ales On 6th (E 6th Ave)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Dee Jay's BBQ Ribs & Grille (Wexford)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Mad Mex (Cranberry)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Dollar General (19008)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Taco Bell - 040070',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Wingstop - 2230',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Fresh Thyme (453)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Big Shot Bob's House of Wings (20445 Route 19)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'TEPACHE MEXICAN KITCHEN & BAR',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Starbucks - 7630',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Aldi Grocery Marketplace (469070)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Aldi Grocery Marketplace (469068)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Dollar General (15169)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Subway (31516)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Buffalo Wild Wings - Wild Burger (189)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'American Natural (Grandview Dr)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Red Robin (Pennsylvania 228)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Aladdin's Eatery - Cranberry",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Jason's Deli - PAC 197",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Sheetz Drive (133)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Carrols LLC (228)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Sheetz (123)',
//       totalTimesDelivered: 42,
//     },
//     {
//       store: 'Burger King (5136)',
//       totalTimesDelivered: 16,
//     },
//     {
//       store: 'Sheetz (133)',
//       totalTimesDelivered: 12,
//     },
//     {
//       store: 'Sheetz (277)',
//       totalTimesDelivered: 11,
//     },
//     {
//       store: 'Primanti Bros (Allison Park)',
//       totalTimesDelivered: 10,
//     },
//     {
//       store: 'Sheetz Drive (123)',
//       totalTimesDelivered: 10,
//     },
//     {
//       store: "Wendy's (2375)",
//       totalTimesDelivered: 10,
//     },
//     {
//       store: 'Dollar General (19485)',
//       totalTimesDelivered: 9,
//     },
//     {
//       store: "Monte Cello's Hampton",
//       totalTimesDelivered: 9,
//     },
//     {
//       store: "Cenci's Pizza Cranberry",
//       totalTimesDelivered: 9,
//     },
//     {
//       store: 'Taco Bell - 031615',
//       totalTimesDelivered: 9,
//     },
//     {
//       store: 'Burger King (4285)',
//       totalTimesDelivered: 8,
//     },
//     {
//       store: "Cenci's Pizza Wexford",
//       totalTimesDelivered: 8,
//     },
//     {
//       store: 'TEQUILA JALISCO MEXICAN RESTAURANT (William Flynn Hwy)',
//       totalTimesDelivered: 8,
//     },
//     {
//       store: 'Taco Bell (31620)',
//       totalTimesDelivered: 8,
//     },
//     {
//       store: "Applebee's 7608 RICHLAND TOWNSHIP",
//       totalTimesDelivered: 8,
//     },
//     {
//       store: "Wendy's (2380)",
//       totalTimesDelivered: 7,
//     },
//     {
//       store: "Applebee's 9671 CRANBERRY",
//       totalTimesDelivered: 7,
//     },
//     {
//       store: 'Jade palace (Gibsonia)',
//       totalTimesDelivered: 7,
//     },
//     {
//       store: 'Taco Bell - 035249',
//       totalTimesDelivered: 7,
//     },
//     {
//       store: '7-Eleven (40119)',
//       totalTimesDelivered: 6,
//     },
//     {
//       store: 'Taco Bell (33089)',
//       totalTimesDelivered: 5,
//     },
//     {
//       store: "McDonald's (23267-228, CRANBERRY TWP)",
//       totalTimesDelivered: 5,
//     },
//     {
//       store: 'Great Wall Chinese Restaurant',
//       totalTimesDelivered: 5,
//     },
//     {
//       store: 'Chick-fil-A (04067)',
//       totalTimesDelivered: 5,
//     },
//     {
//       store: 'Buffalo Wild Wings - 189',
//       totalTimesDelivered: 5,
//     },
//     {
//       store: 'Primanti Bros (Cranberry)',
//       totalTimesDelivered: 5,
//     },
//     {
//       store: 'Condado Tacos (Cranberry)',
//       totalTimesDelivered: 5,
//     },
//     {
//       store: 'Pizza Hut (033952) Marketplace -Quality Huts East',
//       totalTimesDelivered: 4,
//     },
//     {
//       store: "McDonald's (6141 - WARRENDALE)",
//       totalTimesDelivered: 4,
//     },
//     {
//       store: "McDonald's (714-WEXFORD)",
//       totalTimesDelivered: 4,
//     },
//     {
//       store: 'Sheetz (678)',
//       totalTimesDelivered: 4,
//     },
//     {
//       store: 'Taco Bell (31615)',
//       totalTimesDelivered: 4,
//     },
//     {
//       store: 'Red Robin (460)',
//       totalTimesDelivered: 4,
//     },
//     {
//       store: '732 - Noodles & Company',
//       totalTimesDelivered: 4,
//     },
//     {
//       store: 'Sheetz Drive (277)',
//       totalTimesDelivered: 4,
//     },
//     {
//       store: 'Crumbl Cookies (Cranberry Township)',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: '274-SEPHORA ROSS PARK',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Dairy Queen (DQ-17530)',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: "Arby's (1691)",
//       totalTimesDelivered: 3,
//     },
//     {
//       store: "Wendy's (10427)",
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Subway 27773-0',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'China Palace (Wexford)',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'China House',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'CHiKN',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Real Thai Cuisine (Cranberry Twp)',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Saga Steakhouse & Sushi Bar  (Route 19)',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Sheetz (521)',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Buffalo Wild Wings - Wild Burger (298)',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: '7-Eleven (36142)',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'CCC0098125 (100 Northtowne Square)',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Buffalo Wild Wings - 298',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Smokey Bones Bar & Fire Grill (Cranberry Twp - 7572)',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Sheetz - 784',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Dairy Queen (17938)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "Aladdin's Eatery - McKnight",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "Wendy's (2367)",
//       totalTimesDelivered: 2,
//     },
//     {
//       store:
//         'Panera - Flynn Restaurant Group, Pan NorCal LLC (William Flinn Highway)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "Big Shot Bob's Mars (Mars)",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Chipotle (Mackenzie Way)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Taco Bell (35249)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Chipotle (Cranberry Springs)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Chick-fil-A (03804)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Buffalo Wild Wings (189)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Firebirds Wood Fired Grill (Cranberry)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'K ASIAN BISTRO',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Carrols LLC (Butler Street)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "McDonald's (26447-ALLISON PARK)",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Mad Mex (Waterworks)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Pizza Hut (033949) Marketplace -Quality Huts East',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Sheetz (99)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Five Guys PA-0061',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Aldi Grocery Marketplace (469045)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Red Robin (470)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Giant Eagle (Freeport Road) ',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "McDonald's (24334-HOMESTEAD)",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'The Sports Grille at Cranberry (Freedom Rd)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Blaze Pizza (1320 - Cranberry)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Sheetz (617)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'The Wing Experience (@Smokey Bones)(Cranberry Twp - 7572)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Chipotle Mexican Grill - 3161',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "Pizza Joe's (#090 - Big Springs Dr)",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Taco Bell - 033089',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "Eat' N Park (Waterworks)",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Chipotle Mexican Grill - 2655',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "Applebee's (Grandview Crossing)",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'El Campesino (McKnight)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Vocelli Pizza (Cranberry)-',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "111 - DiBella's",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "Stack'd Burgers & Beer (Perry Highway)",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Buffalo Wild Wings (Grandview Crossing)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "Bruster's 0373 (Gibsonia)",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Subway 48654-0',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Walgreens (11865)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'The Burger Experience (@Smokey Bones)(Cranberry Twp - 7572)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Sheetz (115)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "Moe's Southwest Grill (100189)",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Sheetz (477)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Sheetz (631)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Pizza Hut (033977) Marketplace -Quality Huts East',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Avor Thai Restaurant (Commonwealth Dr)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Chipotle Mexican Grill - 2148',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Burger King (2869)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "Arby's (1773)",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Red Lobster - 0229 North Hills, PA',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Dairy Queen (13602)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'JJ Panda (Duncan Ave)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Walgreens (10282)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Chipotle (Cranberry Township)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Burger King (2546)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Vocelli Pizza (Allegheny Ave)-',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Sheetz (189)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Patron Mexican Grill (Cranberry)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Jersey Mike's Subs (8066)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Dollar General (8549)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "BullDawg's",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Stoke's Grill",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Jersey Mike's (Perry Highway)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Rite Aid (10905)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'PetSmart (3001)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'CVS (2449)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'GetGo (3691)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Applebee's 8664 N. HILLS VILLAGE MALL",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Taco Bell (32287)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Freshii (1236)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Chipotle (William Flinn Highway)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Penn Station East Coast Subs - Gibsonia PA - (348)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Mintt Pizza (PA-228)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Burgatory (Cranberry Township)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Target (02262)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Hong Kong Taste ((366 Butler St)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Panera - Flynn Restaurant Group, Pan NorCal LLC (Freeport Road)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'MenuSifu (333 Allegheny Avenue)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Target (02385)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Denny's (9565)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Chili's Grill & Bar (001.005.1152)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Waffles, INCaffeinated, Wexford',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Chipotle (Wexford)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Alioto’s Sports Bar & Restaurant (Grant Ave)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Dollar General (21679)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Chipotle (Freeport Road)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'MenuSifu (848 Allegheny River Boulevard)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'VERONA',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Subway 3129-0',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Patron Mexican Grill (Highland)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Piada Italian Street Food (47 -- East Liberty)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Subway (2967)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'VANDERGRIFT',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Chili's Grill & Bar (001.005.1127)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "It's Just Wings (IJW001.005.1127) (pick up at Chili's)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Dairy Queen (13599)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'CCC0115762 (3036 Freeport Road)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Arby's (1852)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Applebee's 7567 PITTSBURGH MILLS",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Chili's (Pittsburgh Mills Boulevard)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Starbucks (62593)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Aladdins Eatery - Fox Chapel',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: '18th Street Pizza (Allison Park)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "McDonald's (7246-NORTHSIDE)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'CCC0127948 (705 Allegheny Avenue)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Chipotle (Fox Chapel)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Speedway (46253)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Hello Bistro Pine',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Subway 41889-0',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Jersey Mike's (Pennsylvania 8)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Denny's (9566)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Graeter's Ice Cream (Perry Hwy)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Nothing Bundt Cakes - Cranberry Township',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Naturoll Creamery (Cranberry Township)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: '228, CRANBERRY TWP',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Emiliano's Mexican Restaurant (Cranberry)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Peppino's Pizza (Perry Hwy)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Dollar General (14690)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Bowl Market (Cranberry Twp - 7572)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'CCC0115762 (4873 State Highway 8)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Sir Pizza (Treesdale)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Bowl Market (Frazier Twp - 7634)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Applebee's (Village Center Drive)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Eat' N Park (New Kensington)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'LOWER BURRELL',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Taco Bell (33753)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Donatos (460)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Taco Bell (26114)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'CVS (2589)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'PetSmart (591)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'KFC (J625265)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Jersey Mike's Subs (8063)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Pulp Juice and Smoothie Bar-Cranberry PA',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Eat' N Park (Shaler)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "McDonald's (6492-SHALER)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'KFC - J625135',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Mad Mex - North Hills',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Wendy's (2356)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Taco Bell - 033753',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Panera MP (202305 - Perry Highway - Wexford PA)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Cracker Barrel (747)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Chick-fil-A (01583)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Moe's Southwest Grill (379)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Patron Mexican Grill',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Subway (3505)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Los Cabos Mexican Restaurant (Pittsburgh)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'CVS (7611)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Dollar General (19684)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Frank's Pizza & Chicken (Rochester Road)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Wendy's (Freeport Road)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Advance Auto Parts (via OneRail) (5312 William Flinn Highway)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Subway 65130-0',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Eat'n Park (Frankstown Road)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Cold Stone Creamery (21696)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Aldi Grocery Marketplace (469054)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Staples (1597)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Eat' N Park (Hampton Twp)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "McDonald's (24444-GIBSONIA)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'American Natural (Adair Ave)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Chipotle Mexican Grill - 3343',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Primanti Bros. (William Flinn Highway)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Tractor Supply (1162)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Anthony's Coal Fired Pizza (Cranberry)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Aviva Brick Oven (Perry Hwy)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Dunkin' (343581)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Giant Eagle (Town Center Drive)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'The Cheesecake Factory (Ross Park - 0122)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Sheetz Drive (115)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Walgreens (9675)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Arby's (1858)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Italian Oven (1075 Freedom Road)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'El Campesino (Carnegie)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Sheetz Drive (477)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Sheetz Drive (631)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Ales On 6th (E 6th Ave)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Dee Jay's BBQ Ribs & Grille (Wexford)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Mad Mex (Cranberry)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Dollar General (19008)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Taco Bell - 040070',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Wingstop - 2230',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Fresh Thyme (453)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Big Shot Bob's House of Wings (20445 Route 19)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'TEPACHE MEXICAN KITCHEN & BAR',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Starbucks - 7630',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Aldi Grocery Marketplace (469070)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Aldi Grocery Marketplace (469068)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Dollar General (15169)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Subway (31516)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Buffalo Wild Wings - Wild Burger (189)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'American Natural (Grandview Dr)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Red Robin (Pennsylvania 228)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Aladdin's Eatery - Cranberry",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Jason's Deli - PAC 197",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Sheetz Drive (133)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Carrols LLC (228)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Sheetz (123)',
//       totalTimesDelivered: 42,
//     },
//     {
//       store: 'Burger King (5136)',
//       totalTimesDelivered: 16,
//     },
//     {
//       store: 'Sheetz (133)',
//       totalTimesDelivered: 12,
//     },
//     {
//       store: 'Sheetz (277)',
//       totalTimesDelivered: 11,
//     },
//     {
//       store: 'Primanti Bros (Allison Park)',
//       totalTimesDelivered: 10,
//     },
//     {
//       store: 'Sheetz Drive (123)',
//       totalTimesDelivered: 10,
//     },
//     {
//       store: "Wendy's (2375)",
//       totalTimesDelivered: 10,
//     },
//     {
//       store: 'Dollar General (19485)',
//       totalTimesDelivered: 9,
//     },
//     {
//       store: "Monte Cello's Hampton",
//       totalTimesDelivered: 9,
//     },
//     {
//       store: "Cenci's Pizza Cranberry",
//       totalTimesDelivered: 9,
//     },
//     {
//       store: 'Taco Bell - 031615',
//       totalTimesDelivered: 9,
//     },
//     {
//       store: 'Burger King (4285)',
//       totalTimesDelivered: 8,
//     },
//     {
//       store: "Cenci's Pizza Wexford",
//       totalTimesDelivered: 8,
//     },
//     {
//       store: 'TEQUILA JALISCO MEXICAN RESTAURANT (William Flynn Hwy)',
//       totalTimesDelivered: 8,
//     },
//     {
//       store: 'Taco Bell (31620)',
//       totalTimesDelivered: 8,
//     },
//     {
//       store: "Applebee's 7608 RICHLAND TOWNSHIP",
//       totalTimesDelivered: 8,
//     },
//     {
//       store: "Wendy's (2380)",
//       totalTimesDelivered: 7,
//     },
//     {
//       store: "Applebee's 9671 CRANBERRY",
//       totalTimesDelivered: 7,
//     },
//     {
//       store: 'Jade palace (Gibsonia)',
//       totalTimesDelivered: 7,
//     },
//     {
//       store: 'Taco Bell - 035249',
//       totalTimesDelivered: 7,
//     },
//     {
//       store: '7-Eleven (40119)',
//       totalTimesDelivered: 6,
//     },
//     {
//       store: 'Taco Bell (33089)',
//       totalTimesDelivered: 5,
//     },
//     {
//       store: "McDonald's (23267-228, CRANBERRY TWP)",
//       totalTimesDelivered: 5,
//     },
//     {
//       store: 'Great Wall Chinese Restaurant',
//       totalTimesDelivered: 5,
//     },
//     {
//       store: 'Chick-fil-A (04067)',
//       totalTimesDelivered: 5,
//     },
//     {
//       store: 'Buffalo Wild Wings - 189',
//       totalTimesDelivered: 5,
//     },
//     {
//       store: 'Primanti Bros (Cranberry)',
//       totalTimesDelivered: 5,
//     },
//     {
//       store: 'Condado Tacos (Cranberry)',
//       totalTimesDelivered: 5,
//     },
//     {
//       store: 'Pizza Hut (033952) Marketplace -Quality Huts East',
//       totalTimesDelivered: 4,
//     },
//     {
//       store: "McDonald's (6141 - WARRENDALE)",
//       totalTimesDelivered: 4,
//     },
//     {
//       store: "McDonald's (714-WEXFORD)",
//       totalTimesDelivered: 4,
//     },
//     {
//       store: 'Sheetz (678)',
//       totalTimesDelivered: 4,
//     },
//     {
//       store: 'Taco Bell (31615)',
//       totalTimesDelivered: 4,
//     },
//     {
//       store: 'Red Robin (460)',
//       totalTimesDelivered: 4,
//     },
//     {
//       store: '732 - Noodles & Company',
//       totalTimesDelivered: 4,
//     },
//     {
//       store: 'Sheetz Drive (277)',
//       totalTimesDelivered: 4,
//     },
//     {
//       store: 'Crumbl Cookies (Cranberry Township)',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: '274-SEPHORA ROSS PARK',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Dairy Queen (DQ-17530)',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: "Arby's (1691)",
//       totalTimesDelivered: 3,
//     },
//     {
//       store: "Wendy's (10427)",
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Subway 27773-0',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'China Palace (Wexford)',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'China House',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'CHiKN',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Real Thai Cuisine (Cranberry Twp)',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Saga Steakhouse & Sushi Bar  (Route 19)',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Sheetz (521)',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Buffalo Wild Wings - Wild Burger (298)',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: '7-Eleven (36142)',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'CCC0098125 (100 Northtowne Square)',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Buffalo Wild Wings - 298',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Smokey Bones Bar & Fire Grill (Cranberry Twp - 7572)',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Sheetz - 784',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Dairy Queen (17938)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "Aladdin's Eatery - McKnight",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "Wendy's (2367)",
//       totalTimesDelivered: 2,
//     },
//     {
//       store:
//         'Panera - Flynn Restaurant Group, Pan NorCal LLC (William Flinn Highway)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "Big Shot Bob's Mars (Mars)",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Chipotle (Mackenzie Way)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Taco Bell (35249)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Chipotle (Cranberry Springs)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Chick-fil-A (03804)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Buffalo Wild Wings (189)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Firebirds Wood Fired Grill (Cranberry)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'K ASIAN BISTRO',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Carrols LLC (Butler Street)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "McDonald's (26447-ALLISON PARK)",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Mad Mex (Waterworks)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Pizza Hut (033949) Marketplace -Quality Huts East',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Sheetz (99)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Five Guys PA-0061',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Aldi Grocery Marketplace (469045)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Red Robin (470)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Giant Eagle (Freeport Road) ',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "McDonald's (24334-HOMESTEAD)",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'The Sports Grille at Cranberry (Freedom Rd)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Blaze Pizza (1320 - Cranberry)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Sheetz (617)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'The Wing Experience (@Smokey Bones)(Cranberry Twp - 7572)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Chipotle Mexican Grill - 3161',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "Pizza Joe's (#090 - Big Springs Dr)",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Taco Bell - 033089',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "Eat' N Park (Waterworks)",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Chipotle Mexican Grill - 2655',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "Applebee's (Grandview Crossing)",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'El Campesino (McKnight)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Vocelli Pizza (Cranberry)-',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "111 - DiBella's",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "Stack'd Burgers & Beer (Perry Highway)",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Buffalo Wild Wings (Grandview Crossing)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "Bruster's 0373 (Gibsonia)",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Subway 48654-0',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Walgreens (11865)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'The Burger Experience (@Smokey Bones)(Cranberry Twp - 7572)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Sheetz (115)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "Moe's Southwest Grill (100189)",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Sheetz (477)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Sheetz (631)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Pizza Hut (033977) Marketplace -Quality Huts East',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Avor Thai Restaurant (Commonwealth Dr)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Chipotle Mexican Grill - 2148',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Burger King (2869)',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "Arby's (1773)",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Red Lobster - 0229 North Hills, PA',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Dairy Queen (13602)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'JJ Panda (Duncan Ave)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Walgreens (10282)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Chipotle (Cranberry Township)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Burger King (2546)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Vocelli Pizza (Allegheny Ave)-',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Sheetz (189)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Patron Mexican Grill (Cranberry)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Jersey Mike's Subs (8066)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Dollar General (8549)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "BullDawg's",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Stoke's Grill",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Jersey Mike's (Perry Highway)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Rite Aid (10905)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'PetSmart (3001)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'CVS (2449)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'GetGo (3691)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Applebee's 8664 N. HILLS VILLAGE MALL",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Taco Bell (32287)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Freshii (1236)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Chipotle (William Flinn Highway)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Penn Station East Coast Subs - Gibsonia PA - (348)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Mintt Pizza (PA-228)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Burgatory (Cranberry Township)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Target (02262)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Hong Kong Taste ((366 Butler St)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Panera - Flynn Restaurant Group, Pan NorCal LLC (Freeport Road)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'MenuSifu (333 Allegheny Avenue)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Target (02385)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Denny's (9565)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Chili's Grill & Bar (001.005.1152)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Waffles, INCaffeinated, Wexford',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Chipotle (Wexford)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Alioto’s Sports Bar & Restaurant (Grant Ave)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Dollar General (21679)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Chipotle (Freeport Road)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'MenuSifu (848 Allegheny River Boulevard)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'VERONA',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Subway 3129-0',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Patron Mexican Grill (Highland)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Piada Italian Street Food (47 -- East Liberty)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Subway (2967)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'VANDERGRIFT',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Chili's Grill & Bar (001.005.1127)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "It's Just Wings (IJW001.005.1127) (pick up at Chili's)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Dairy Queen (13599)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'CCC0115762 (3036 Freeport Road)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Arby's (1852)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Applebee's 7567 PITTSBURGH MILLS",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Chili's (Pittsburgh Mills Boulevard)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Starbucks (62593)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Aladdins Eatery - Fox Chapel',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: '18th Street Pizza (Allison Park)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "McDonald's (7246-NORTHSIDE)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'CCC0127948 (705 Allegheny Avenue)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Chipotle (Fox Chapel)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Speedway (46253)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Hello Bistro Pine',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Subway 41889-0',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Jersey Mike's (Pennsylvania 8)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Denny's (9566)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Graeter's Ice Cream (Perry Hwy)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Nothing Bundt Cakes - Cranberry Township',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Naturoll Creamery (Cranberry Township)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: '228, CRANBERRY TWP',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Emiliano's Mexican Restaurant (Cranberry)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Peppino's Pizza (Perry Hwy)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Dollar General (14690)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Bowl Market (Cranberry Twp - 7572)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'CCC0115762 (4873 State Highway 8)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Sir Pizza (Treesdale)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Bowl Market (Frazier Twp - 7634)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Applebee's (Village Center Drive)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Eat' N Park (New Kensington)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'LOWER BURRELL',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Taco Bell (33753)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Donatos (460)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Taco Bell (26114)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'CVS (2589)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'PetSmart (591)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'KFC (J625265)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Jersey Mike's Subs (8063)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Pulp Juice and Smoothie Bar-Cranberry PA',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Eat' N Park (Shaler)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "McDonald's (6492-SHALER)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'KFC - J625135',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Mad Mex - North Hills',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Wendy's (2356)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Taco Bell - 033753',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Panera MP (202305 - Perry Highway - Wexford PA)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Cracker Barrel (747)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Chick-fil-A (01583)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Moe's Southwest Grill (379)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Patron Mexican Grill',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Subway (3505)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Los Cabos Mexican Restaurant (Pittsburgh)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'CVS (7611)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Dollar General (19684)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Frank's Pizza & Chicken (Rochester Road)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Wendy's (Freeport Road)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Advance Auto Parts (via OneRail) (5312 William Flinn Highway)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Subway 65130-0',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Eat'n Park (Frankstown Road)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Cold Stone Creamery (21696)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Aldi Grocery Marketplace (469054)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Staples (1597)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Eat' N Park (Hampton Twp)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "McDonald's (24444-GIBSONIA)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'American Natural (Adair Ave)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Chipotle Mexican Grill - 3343',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Primanti Bros. (William Flinn Highway)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Tractor Supply (1162)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Anthony's Coal Fired Pizza (Cranberry)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Aviva Brick Oven (Perry Hwy)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Dunkin' (343581)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Giant Eagle (Town Center Drive)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'The Cheesecake Factory (Ross Park - 0122)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Sheetz Drive (115)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Walgreens (9675)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Arby's (1858)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Italian Oven (1075 Freedom Road)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'El Campesino (Carnegie)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Sheetz Drive (477)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Sheetz Drive (631)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Ales On 6th (E 6th Ave)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Dee Jay's BBQ Ribs & Grille (Wexford)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Mad Mex (Cranberry)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Dollar General (19008)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Taco Bell - 040070',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Wingstop - 2230',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Fresh Thyme (453)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Big Shot Bob's House of Wings (20445 Route 19)",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'TEPACHE MEXICAN KITCHEN & BAR',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Starbucks - 7630',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Aldi Grocery Marketplace (469070)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Aldi Grocery Marketplace (469068)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Dollar General (15169)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Subway (31516)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Buffalo Wild Wings - Wild Burger (189)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'American Natural (Grandview Dr)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Red Robin (Pennsylvania 228)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Aladdin's Eatery - Cranberry",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Jason's Deli - PAC 197",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Sheetz Drive (133)',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Carrols LLC (228)',
//       totalTimesDelivered: 1,
//     },
//   ],
//   topChainStores: [
//     {
//       store: 'Sheetz',
//       totalTimesDelivered: 104,
//     },
//     {
//       store: 'Taco Bell',
//       totalTimesDelivered: 42,
//     },
//     {
//       store: 'Burger King',
//       totalTimesDelivered: 27,
//     },
//     {
//       store: "Wendy's",
//       totalTimesDelivered: 24,
//     },
//     {
//       store: "McDonald's",
//       totalTimesDelivered: 20,
//     },
//     {
//       store: "Applebee's",
//       totalTimesDelivered: 20,
//     },
//     {
//       store: "Cenci's Pizza",
//       totalTimesDelivered: 17,
//     },
//     {
//       store: 'Chipotle',
//       totalTimesDelivered: 16,
//     },
//     {
//       store: 'Primanti Bros',
//       totalTimesDelivered: 16,
//     },
//     {
//       store: 'Buffalo Wild Wings',
//       totalTimesDelivered: 16,
//     },
//     {
//       store: 'Dollar General',
//       totalTimesDelivered: 15,
//     },
//     {
//       store: 'Subway',
//       totalTimesDelivered: 11,
//     },
//     {
//       store: "Monte Cello's",
//       totalTimesDelivered: 9,
//     },
//     {
//       store: '7-Eleven',
//       totalTimesDelivered: 9,
//     },
//     {
//       store: 'Pizza Hut',
//       totalTimesDelivered: 8,
//     },
//     {
//       store: 'Chick-fil-A',
//       totalTimesDelivered: 8,
//     },
//     {
//       store: 'TEQUILA JALISCO MEXICAN RESTAURANT',
//       totalTimesDelivered: 8,
//     },
//     {
//       store: 'Dairy Queen',
//       totalTimesDelivered: 7,
//     },
//     {
//       store: "Arby's",
//       totalTimesDelivered: 7,
//     },
//     {
//       store: 'Jade palace',
//       totalTimesDelivered: 7,
//     },
//     {
//       store: 'Red Robin',
//       totalTimesDelivered: 7,
//     },
//     {
//       store: 'Great Wall Chinese Restaurant',
//       totalTimesDelivered: 5,
//     },
//     {
//       store: 'Aldi Grocery Marketplace',
//       totalTimesDelivered: 5,
//     },
//     {
//       store: "Eat' N Park",
//       totalTimesDelivered: 5,
//     },
//     {
//       store: 'Condado Tacos',
//       totalTimesDelivered: 5,
//     },
//     {
//       store: 'Walgreens',
//       totalTimesDelivered: 4,
//     },
//     {
//       store: 'Panera',
//       totalTimesDelivered: 4,
//     },
//     {
//       store: 'Mad Mex',
//       totalTimesDelivered: 4,
//     },
//     {
//       store: 'Noodles & Company',
//       totalTimesDelivered: 4,
//     },
//     {
//       store: "Aladdin's Eatery",
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Vocelli Pizza',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Patron Mexican Grill',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Crumbl Cookies',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'SEPHORA',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'CVS',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'China Palace',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'China House',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'CHiKN',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Real Thai Cuisine',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Carrols LLC',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Giant Eagle',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Saga Steakhouse & Sushi Bar',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'El Campesino',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: "Moe's Southwest Grill",
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'CCC0098125',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: 'Smokey Bones Bar & Fire Grill',
//       totalTimesDelivered: 3,
//     },
//     {
//       store: "Jersey Mike's Subs",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "Jersey Mike's",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'PetSmart',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "Big Shot Bob's Mars",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Firebirds Wood Fired Grill',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'K ASIAN BISTRO',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Target',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'MenuSifu',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "Denny's",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "Chili's Grill & Bar",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'CCC0115762',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Starbucks',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Five Guys',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'The Sports Grille at Cranberry',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Blaze Pizza',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'The Wing Experience',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Bowl Market',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "Pizza Joe's",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'KFC',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "DiBella's",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "Stack'd Burgers & Beer",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'American Natural',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: "Bruster's",
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'The Burger Experience',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Avor Thai Restaurant',
//       totalTimesDelivered: 2,
//     },
//     {
//       store: 'Red Lobster',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'JJ Panda',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "BullDawg's",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Stoke's Grill",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Rite Aid',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'GetGo',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Freshii',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Penn Station East Coast Subs',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Mintt Pizza',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Burgatory',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Hong Kong Taste',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Waffles, INCaffeinated',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Alioto’s Sports Bar & Restaurant',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'VERONA',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Piada Italian Street Food',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'VANDERGRIFT',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "It's Just Wings",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Chili's",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Aladdins Eatery - Fox Chapel',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: '18th Street Pizza',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'CCC0127948',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Speedway',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Hello Bistro Pine',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Graeter's Ice Cream",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Nothing Bundt Cakes',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Naturoll Creamery',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: '228, CRANBERRY TWP',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Emiliano's Mexican Restaurant",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Peppino's Pizza",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Sir Pizza',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'LOWER BURRELL',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Donatos',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Pulp Juice and Smoothie Bar-Cranberry PA',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Cracker Barrel',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Los Cabos Mexican Restaurant',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Frank's Pizza & Chicken",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Advance Auto Parts',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Eat'n Park",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Cold Stone Creamery',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Staples',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Tractor Supply',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Anthony's Coal Fired Pizza",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Aviva Brick Oven',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Dunkin'",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'The Cheesecake Factory',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Italian Oven',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Ales On 6th',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Dee Jay's BBQ Ribs & Grille",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Wingstop',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'Fresh Thyme',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Big Shot Bob's House of Wings",
//       totalTimesDelivered: 1,
//     },
//     {
//       store: 'TEPACHE MEXICAN KITCHEN & BAR',
//       totalTimesDelivered: 1,
//     },
//     {
//       store: "Jason's Deli",
//       totalTimesDelivered: 1,
//     },
//   ],
//   numIndividualStores: 250,
//   numChainStores: 124,
//   totalDeliveryTimeMS: 423895577,
//   avgDeliveryTimeMS: 720911,
//   avgDeliveryTimePerDayMS: 8582,
//   avgDeliveryTimePerMonthMS: 60076,
//   avgDeliveryTimePerWeekMS: 180228,
//   shortestDelivery: {
//     ORDER_CREATED_TIME: '2023-10-20 19:08:10.248985000',
//     ACTUAL_PICKUP_TIME: '2023-10-20 23:49:11.763110000',
//     ACTUAL_DELIVERY_TIME: '2023-10-20 23:50:50.715320000',
//     STORE_NAME: 'Giant Eagle (Town Center Drive)',
//     TOTAL_ITEM_COUNT: 33,
//     SUBTOTAL_IN_CENTS: 0,
//     ORDER_STATUS: 'Order Delivered',
//   },
//   longestDelivery: {
//     ORDER_CREATED_TIME: '2023-11-05 01:36:43.253921000',
//     ACTUAL_PICKUP_TIME: '2023-11-05 01:58:59.859231000',
//     ACTUAL_DELIVERY_TIME: '2023-11-05 02:20:44.387993000',
//     STORE_NAME: "Applebee's 9671 CRANBERRY",
//     TOTAL_ITEM_COUNT: 3,
//     SUBTOTAL_IN_CENTS: 4354,
//     ORDER_STATUS: 'Order Delivered',
//   },
//   totalItemsDelivered: 2365,
//   avgNumItemsPerDelivery: 4.02,
//   deliveryWithMostItems: {
//     ORDER_CREATED_TIME: '2023-10-19 02:29:23.425118000',
//     ACTUAL_PICKUP_TIME: '2023-10-19 02:39:22.707544000',
//     ACTUAL_DELIVERY_TIME: '2023-10-19 02:56:38.997368000',
//     STORE_NAME: 'Taco Bell - 035249',
//     TOTAL_ITEM_COUNT: 47,
//     SUBTOTAL_IN_CENTS: 3719,
//     ORDER_STATUS: 'Order Delivered',
//   },
// }

type ShareableCardProps = {
  recapData: RewindData
  createYourOwnBtn?: boolean
}
const ShareableCard = ({
  recapData,
  createYourOwnBtn = false,
}: ShareableCardProps) => {
  const [shareModalOpen, setShareModalOpen] = useState(false)

  const [imgURL, setImgURL] = useState<string | null>(null)

  const [copyLinkStatus, setCopyLinkStatus] =
    useState<CopyLinkStatus>('default')

  const { topChainStores, numOrders, totalDeliveryTimeMS, numChainStores } =
    recapData

  const currYear = new Date().getFullYear()

  const cardRef = useRef<HTMLDivElement>(null)

  const handleShare = () => {
    if (cardRef.current) {
      setShareModalOpen(true)
      htmlToImage.toPng(cardRef.current).then(dataURL => {
        setImgURL(dataURL)
      })
    }
  }
  const handleCreateAndCopyLink = async () => {
    if (!recapData) {
      console.error(
        'Something went wrong fetching recapData, please refresh and try again.'
      )
      throw new Error(
        'Something went wrong fetching recapData, please refresh and try again.'
      )
    }
    setCopyLinkStatus('loading')
    const nanoid = customAlphabet(alphabet, 12)
    const cardID = nanoid()
    try {
      const sharedCardDataCollection = collection(db, 'sharedCardData')
      await setDoc(doc(sharedCardDataCollection, cardID), recapData)
    } catch (error) {
      console.error(error)
      setCopyLinkStatus('default')
    }

    const baseURL = window.location.origin
    const link = `${baseURL}/share/${cardID}`

    navigator.clipboard.writeText(link)

    setCopyLinkStatus('copied')
    setTimeout(() => {
      setCopyLinkStatus('default')
    }, 3000)
  }

  return (
    <div className='shareable-card-container'>
      <div className='shareable-card' ref={cardRef}>
        <div className='header'>
          <div className='header-text'>
            <div className='doordash-logo'>
              <img src={doordashLogo} alt='doordash logo' />
              <div className='text'>DOORDASH</div>
            </div>
            <div className='wrapped-text'>{currYear} RECAP</div>
          </div>
          <div className='line'></div>
        </div>

        <div className='body'>
          <div className='top-stores-container'>
            <div className='title'>Top Stores</div>
            <div className='store-list'>
              {topChainStores.slice(0, 6).map(storeData => {
                const { store, totalTimesDelivered } = storeData
                return (
                  <div className='store-info-item' key={storeData.store}>
                    <div className='store-name'>
                      {concatString(`${store}`, 18).toLowerCase()}
                    </div>
                    <div className='times-delivered'>
                      - <span>{totalTimesDelivered}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className='stats-container'>
            <div className='stat orders-delivered'>
              <div className='title'>Orders Delivered</div>
              <div className='number'>{numOrders.toLocaleString()}</div>
            </div>
            <div className='stat minutes-delivering'>
              <div className='title'>Minutes Delievered</div>
              <div className='number'>
                {msToMinutes(totalDeliveryTimeMS).toLocaleString()}
              </div>
            </div>
            <div className='stat unique-stores'>
              <div className='title'>Unique Stores</div>
              <div className='number'>{numChainStores.toLocaleString()}</div>
            </div>
          </div>
        </div>
        <div className='bottom-info'>
          <div className='title'>Top Dashing Times</div>
          <div className='text'>- Sunday Night / 9PM - 12PM</div>
        </div>
        <div className='footer'>
          <div className='link'>doordash-recap.netlify.app</div>
        </div>
      </div>
      <div className='action-btns'>
        <button className='share-btn btn-no-styles' onClick={handleShare}>
          <PiShareFatFill className='icon' />
          Share Recap
        </button>
        {createYourOwnBtn && (
          <Link to='/' className='create-btn link btn-no-styles'>
            Create Your Recap
          </Link>
        )}
      </div>
      <ShareModal
        isOpen={shareModalOpen}
        setIsOpen={setShareModalOpen}
        imgURL={imgURL}
        handleCreateAndCopyLink={handleCreateAndCopyLink}
        copyLinkStatus={copyLinkStatus}
      />
    </div>
  )
}

export default ShareableCard
