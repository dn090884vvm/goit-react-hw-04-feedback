// import Statistic from './Statistic/Statistic';

import { GlobalStyle } from './GlobalStyle';
import { useState } from 'react';
import { Statistics } from './Statistics/Statistics';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onFeedbackChanging = feedbackOption => {
    switch (feedbackOption) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;
      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;
      case 'bad':
        setBad(prevState => prevState + 1);
        break;
      default:
        return;
    }
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    return Math.round((good / countTotalFeedback()) * 100);
  };

  const stateKeys = Object.keys({ good, neutral, bad });

  return (
    <>
      <GlobalStyle />
      <div>
        <Section title="Please, leave Your feedback">
          <FeedbackOptions
            options={stateKeys}
            onLeaveFeedback={onFeedbackChanging}
          />
        </Section>

        <Section title="Statistic">
          {countTotalFeedback === 0 ? (
            <Notification message="There are no any feedback yet " />
          ) : (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={countTotalFeedback()}
              positivePercentage={countPositiveFeedbackPercentage()}
            />
          )}
        </Section>
      </div>
    </>
  );
}
