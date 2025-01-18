import { motion } from 'framer-motion';
import { useEffect } from 'react';
import styles from './Book.module.css';

const Book = ({ isHacker }) => {
  const content = isHacker ? {
    // Content for hacker perspective
    title: "Phishing Techniques Guide",
    chapters: [
      "Understanding Social Engineering",
      "Creating Convincing Emails",
      "Building Fake Landing Pages",
      "Analyzing User Psychology"
    ]
  } : {
    // Content for defense perspective
    title: "Phishing Prevention Guide",
    chapters: [
      "Identifying Suspicious Emails",
      "Verifying Sender Authenticity",
      "Safe Browsing Practices",
      "Password Security"
    ]
  };

  useEffect(() => {
    // Load PT Sans font
    const WebFont = window.WebFont;
    if (WebFont) {
      WebFont.load({
        google: {
          families: ["PT Sans:400,400italic,700,700italic"]
        }
      });
    }
  }, []);

  const phishingTips = isHacker ? {
    leftPage: {
      title: "Creating Convincing Emails",
      tips: [
        "Study real bank email templates and formats",
        "Use urgency to prompt immediate action",
        "Craft professional-looking layouts",
        "Include official-looking logos and branding",
        "Create believable scenarios and contexts"
      ]
    },
    rightPage: {
      title: "Social Engineering Basics",
      tips: [
        "Understand human psychology and trust",
        "Research target demographics",
        "Use current events as pretexts",
        "Leverage authority and familiarity",
        "Create compelling call-to-actions"
      ]
    }
  } : {
    leftPage: {
      title: "Spot Fake Banking Emails",
      tips: [
        "Check sender's email address carefully - banks use official domains",
        "Be wary of urgent or threatening language",
        "Look for personalization - legitimate banks use your name, not 'Dear Customer'",
        "Hover over links without clicking to preview URLs",
        "Banks never ask for passwords or full account details via email"
      ]
    },
    rightPage: {
      title: "Protect Yourself",
      tips: [
        "Never click links directly from emails - type bank URLs manually",
        "Enable two-factor authentication on all accounts",
        "Keep software and browsers updated",
        "Use unique, strong passwords for each account",
        "Report suspicious emails to your bank and delete them"
      ]
    }
  };

  return (
    <div className={styles.scene}>
      <div className={`${styles.bookWrap} ${isHacker ? styles.hackerMode : styles.victimMode}`}>
        <div className={`${styles.leftSide}`}>
          <div className={styles.bookCoverLeft}></div>
          {/* Add layered pages */}
          {[1, 2, 3, 4].map(layer => (
            <div key={`layer${layer}`} className={styles[`layer${layer}`]}>
              <div className={styles.pageLeft}></div>
            </div>
          ))}
          <div className={styles.layerText}>
            <div className={styles.pageLeft2}>
              <div className={`${styles.pageText} ${isHacker ? styles.hackerText : styles.victimText}`}>
                <h3>{phishingTips.leftPage.title}</h3>
                {phishingTips.leftPage.tips.map((tip, index) => (
                  <p key={index}>{tip}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.center}></div>
        
        <div className={`${styles.rightSide} ${isHacker ? styles.hackerMode : styles.victimMode}`}>
          <div className={styles.bookCoverRight}></div>
          {/* Add layered pages */}
          {[1, 2, 3, 4].map(layer => (
            <div key={`layer${layer}-right`} className={`${styles[`layer${layer}`]} ${styles.right}`}>
              <div className={styles.pageRight}></div>
            </div>
          ))}
          <div className={`${styles.layerText} ${styles.right}`}>
            <div className={styles.pageRight2}>
              <div className={`${styles.pageText} ${isHacker ? styles.hackerText : styles.victimText}`}>
                <h3>{phishingTips.rightPage.title}</h3>
                {phishingTips.rightPage.tips.map((tip, index) => (
                  <p key={index}>{tip}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
