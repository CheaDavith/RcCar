import onRoadImg from "../assets/GT.jpeg";
import onRoadImg1 from "../assets/Rlx.jpg";
import buggyImg from "../assets/X2.jpeg";
import buggyImg1 from "../assets/TBy.jpeg";
import monsterImg from "../assets/C4x4.jpeg";
import monsterImg1 from "../assets/TCrusher.jpeg";
import driftImg from "../assets/RX.jpg";
import driftImg1 from "../assets/SGT.jpg";

export const CAR_TYPES = ["On-road", "Off-road", "Monster Truck", "Drift"];

export const CARS = [
  {
    id: "vantage-8",
    name: "Vantage 8 GT",
    type: "On-road",
    price: 189.99,
    image: onRoadImg,
    scale: "1:10",
    topSpeed: "45 mph",
    description:
      "A smooth, planted on-road racer built for tarmac. Precise steering and a low center of gravity make it a favorite for track days.",
  },
  {
    id: "streak-racer",
    name: "Streak Racer LX",
    type: "On-road",
    price: 159.99,
    image: onRoadImg1,
    scale: "1:12",
    topSpeed: "38 mph",
    description:
      "Lightweight chassis with responsive handling — a great pick for beginners moving up from a starter kit.",
  },
  {
    id: "dune-hopper",
    name: "Dune Hopper X2",
    type: "Off-road",
    price: 219.99,
    image: buggyImg,
    scale: "1:8",
    topSpeed: "32 mph",
    description:
      "Long-travel suspension and knobby tires soak up rough terrain, sand, and gravel without breaking stride.",
  },
  {
    id: "trailblazer",
    name: "Trailblazer Buggy",
    type: "Off-road",
    price: 199.99,
    image: buggyImg1,
    scale: "1:10",
    topSpeed: "29 mph",
    description:
      "A rugged all-rounder for backyard trails and rocky paths, with a sealed gearbox to keep dirt out.",
  },
  {
    id: "colossus-4x4",
    name: "Colossus 4x4",
    type: "Monster Truck",
    price: 259.99,
    image: monsterImg,
    scale: "1:8",
    topSpeed: "25 mph",
    description:
      "Oversized tires and a reinforced frame let this beast climb obstacles and crush scale terrain alike.",
  },
  {
    id: "titan-crusher",
    name: "Titan Crusher",
    type: "Monster Truck",
    price: 279.99,
    image: monsterImg1,
    scale: "1:10",
    topSpeed: "27 mph",
    description:
      "Four-wheel drive and high-torque motors give the Titan Crusher serious climbing power for backyard bashing.",
  },
  {
    id: "driftking-rx7",
    name: "DriftKing RX",
    type: "Drift",
    price: 174.99,
    image: driftImg,
    scale: "1:10",
    topSpeed: "36 mph",
    description:
      "Slick tires and a tuned rear-wheel drivetrain are built for holding a smooth, controllable drift angle.",
  },
  {
    id: "sidewinder-gt",
    name: "Sidewinder GT",
    type: "Drift",
    price: 184.99,
    image: driftImg1,
    scale: "1:10",
    topSpeed: "34 mph",
    description:
      "Adjustable suspension geometry lets you dial in the perfect setup for parking-lot drift sessions.",
  },
];