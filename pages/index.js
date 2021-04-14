import { useState, useEffect } from "react"
import Head from 'next/head'
import { 
  Container, 
  FormControl, 
  Heading,
  Input,
  InputLeftElement, 
  Text 
} from "@chakra-ui/react"

const daysLeftInYear = () => {
  // Calculates based on how many days until the end of the year
  const now = new Date();
  const newYear = new Date(`January, 01, ${now.getFullYear() + 1}`)
  const timeDiff = newYear - now
  
  return timeDiff/ (1000 * 3600 * 24)
}

export default function Home() {
  const [goalAmount, setGoalAmount] = useState(0.00)
  const [goalProgress, setGoalProgress] = useState(0.00)
  const [dailyAmount, setDailyAmount] = useState(0.00)
  
  useEffect(() => {
    if(goalAmount == 0.00) return

    const daysLeft = daysLeftInYear()
    const amountLeftToEarn = goalAmount - goalProgress
    const earningsPerDay = (amountLeftToEarn / daysLeft).toFixed(2) 
     setDailyAmount(earningsPerDay)
  }, 
  [goalAmount, goalProgress, setGoalAmount, setGoalProgress])

  return (
    <>
      <Head>
        <title>Daily earnings to reach your financial goal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW="xl" spacing="6">
        <Heading margin="6">How much money do I need to make today to hit my yearly goal?</Heading>
        
        <FormControl marginBottom="6">
          <Input 
            type="text" 
            placeholder="What is your goal for the year?" 
            size="lg" 
            name="goal"
            onChange={ event => setGoalAmount(event.target.value)}
            value={goalAmount}
          />
        </FormControl>
        <FormControl marginBottom="6">
          <Input
            type="text" 
            placeholder="How much have you made so far?" 
            size="lg" 
            name="progress" 
            onChange={ event => setGoalProgress(event.target.value)}
            value={goalProgress}
          />
        </FormControl>

        <Text marginTop="6" fontSize="6xl" color="green.400" align="center">{`$${dailyAmount}`}</Text>
      </Container>
    </>
  )
}
