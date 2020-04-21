import * as cron from 'node-cron'
import { unansweredTweets } from './checkUnansweredTweets'

cron.schedule('*/10 * * * * *', unansweredTweets)
//unansweredTweets()
