import dotenv from 'dotenv'
dotenv.config()
import Stripe from "stripe"

const stripe= new Stripe(process.env.STRIPE_SCRETE_KEY)

export default stripe

