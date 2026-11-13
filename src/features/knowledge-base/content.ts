export type CategoryId =
  | "getting-started"
  | "features"
  | "privacy"
  | "troubleshooting"
  | "general";
export interface Article {
  id: string;
  title: string;
  category: CategoryId;
  summary: string;
  sections: { title: string; paragraphs: string[] }[];
}
export const categories: {
  id: CategoryId;
  title: string;
  description: string;
}[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Everything you need to feel at home with BellAI on iOS.",
  },
  {
    id: "features",
    title: "Features",
    description: "Explore conversations, voice, mail, and everyday wellness.",
  },
  {
    id: "privacy",
    title: "Privacy & Security",
    description:
      "Understand how your personal assistant keeps your data on your devices.",
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    description: "Get help with connections and permissions.",
  },
  {
    id: "general",
    title: "General",
    description: "Learn more about BellAI and your settings.",
  },
];
const section = (title: string, ...paragraphs: string[]) => ({
  title,
  paragraphs,
});
export const articles: Article[] = [
  {
    id: "set-up-bellai",
    title: "Getting started with BellAI on iOS",
    category: "getting-started",
    summary:
      "Connect your iPhone, set up your Mac, and start your first conversation.",
    sections: [
      section(
        "What you need",
        "BellAI v1.0 (development build 1) requires iOS 17.0 or later. No BellAI account is needed. Connect your device to your Tailscale network with access to your Mac, named ai-server.",
        "The Mac must run the chat server on port 11434, the voice server on port 8000, and the data server on port 8001. Allow local-network access if prompted.",
      ),
      section(
        "Your first conversation",
        "1. Open BellAI. The Home tab opens. Set your greeting name in Settings → Profile.",
        "2. Tap “What can I help with?” and type a message, or tap the microphone and speak.",
        "3. Tap the Send arrow or the keyboard’s Send key. BellAI opens the conversation and shows “Thinking…” while it waits for the Mac.",
      ),
      section(
        "Permissions, when you need them",
        "BellAI asks for your microphone for voice input, camera for meal photos, Apple Health for wellness and nutrition, and location for weather when those features are first used.",
      ),
      section(
        "For developers",
        "Open BellAI.xcodeproj in Xcode, select the BellAI target and a compatible device or simulator, then build and run. The target uses HealthKit and WeatherKit capabilities. WeatherKit requires a paid Apple Developer Program membership.",
      ),
    ],
  },
  {
    id: "server-options",
    title: "Connect BellAI to your Mac server",
    category: "getting-started",
    summary:
      "Set your server address and check chat, voice, and task connections.",
    sections: [
      section(
        "Save and test your connection",
        "Open Settings → Server options. The default host, ai-server, is your Mac’s name on Tailscale. Enter the Mac’s IP address to use NetBird or a local network instead. Only change a port if you changed it on the Mac.",
        "Tap Save and test to check the chat, voice, and tasks servers. Settings are stored on the phone and apply immediately. Tasks and mail reload from the new server. Reset restores the defaults.",
      ),
      section(
        "Server ports",
        "Chat: 11434. Voice input, spoken replies, meal analysis, recommendations, and mail: 8000. Tasks: 8001. The chat service answers like Ollama; the model name in the app is ignored.",
      ),
      section(
        "Which addresses work?",
        "The app allows plain HTTP to IP addresses, short names such as ai-server, and .local names. Longer names such as mac.netbird.cloud are blocked by the app’s iOS networking configuration. Use the IP address instead.",
      ),
    ],
  },
  {
    id: "voice-input",
    title: "Talk to BellAI with voice input",
    category: "features",
    summary: "Record a message and let your Mac turn it into text.",
    sections: [
      section(
        "Start speaking",
        "Tap the microphone on Home or BellAI and allow microphone access. “Listening… tap to send” appears. Audio is recorded on the phone and transcribed by Whisper running on MLX on your Mac. It is not sent to Apple; Speech Recognition permission is not required.",
      ),
      section(
        "Finish and send",
        "Pause for about 1.5 seconds or tap Stop to finish and send. Recording also ends after 60 seconds, or after 8 seconds of silence. “Transcribing…” appears while your Mac converts the recording to text, then the text enters the chat flow. If nothing was heard, BellAI shows an alert.",
      ),
      section(
        "Cancel a recording",
        "Close BellAI, switch tabs, or tap Stop during “Transcribing…” to discard the recording. Recording also stops when the app enters the background, a call interrupts it, or before a request is sent.",
      ),
      section(
        "If recording does not work",
        "The voice server must be reachable. Check your network and port 8000 if a connection error appears. Test on a real device: the iOS Simulator microphone can hang.",
      ),
    ],
  },
  {
    id: "conversations",
    title: "Start and manage a conversation",
    category: "features",
    summary:
      "Send messages, hear replies, and understand conversation history.",
    sections: [
      section(
        "Chat and follow up",
        "Send a prompt from Home, such as “Help me plan my day.” Only one request can run at a time. On the BellAI screen, tap the keyboard button to type a follow-up. Previous user and assistant messages are included for context.",
        "Messages must contain 1–4,000 characters after surrounding whitespace is trimmed. Validation problems appear in an alert; connection or server failures appear in the conversation.",
      ),
      section(
        "Listen to replies",
        "With the speaker on, the reply streams as it is written and each sentence is spoken as soon as it is ready. With the speaker off, or if the voice server cannot be reached, the reply appears when the server finishes.",
      ),
      section(
        "Your conversation history",
        "Switching tabs preserves the conversation while the app remains running. The close button returns to Home. Sending a valid new prompt from Home starts a new session and clears the previous conversation. History is kept in memory and is not saved across app launches.",
      ),
    ],
  },
  {
    id: "meal-photos",
    title: "Log a meal with a photo",
    category: "features",
    summary: "Analyze a meal, adjust nutrition, and save it to Apple Health.",
    sections: [
      section(
        "Choose a photo",
        "Tap Log meal in Activity, the photo button on Home, or the photo button beside the BellAI keyboard. Choose Take Photo or Choose from Library. Devices without a camera open the library. Text entered before selecting the photo is included as a note.",
      ),
      section(
        "Review and save",
        "Results appear in a sheet, not in the conversation, and are not read aloud. Review the estimated calories and protein. Log meal saves them to Apple Health. Edit lets you correct either number; saving the correction logs the meal automatically.",
        "If no food is found, nothing is logged. A saved meal cannot be edited or logged again in BellAI. Correct it in the Health app afterwards.",
      ),
      section(
        "Your meal journal",
        "Each logged meal is also stored on your phone for 14 days with calories, protein, carbs, fat, fiber, sugar, and sodium. Apple Health receives calories and protein only. Recommendations use this on-device journal.",
      ),
      section(
        "Health permission issues",
        "Apple Health requests permission to save nutrition the first time. If access is denied, allow it in the Health app. Your edits remain, and you can try Log meal again.",
      ),
    ],
  },
  {
    id: "mail",
    title: "Read your mail and approve a reply",
    category: "features",
    summary: "Read summaries and review every email before sending.",
    sections: [
      section(
        "Open your mail",
        "Tap Mail on Home to see messages processed by the Mac’s mail watcher. Each entry includes the sender, a one-sentence summary, actions, and any deadline. Important messages are marked. The Home row shows important messages or drafts awaiting approval. Pull down to refresh; the list also refreshes when the app opens.",
        "Tap an email to read the notes. The app receives the sender, subject, date, and model’s notes, never the original email itself.",
      ),
      section(
        "Write a reply or new email",
        "For a reply, describe what to say, such as “yes, Thursday works,” then tap Write reply. The Mac reads the original first, so this can take about a minute. To compose a new email, tap the pencil, enter an address and instructions, and tap Write email.",
      ),
      section(
        "You approve every send",
        "Review To, Subject, and the full text. Only pressing Send sends the email. Discard throws the draft away. A draft can be sent only once. Drafts created from Discord and the app share the same Waiting for your approval queue.",
        "Emails may contain text designed to trick an AI. Always review the recipient and every draft. Do not rely on summaries for decisions where mistakes would be costly.",
      ),
      section(
        "Mail in conversations",
        "BellAI has context about important emails in chat, just as it does about your open tasks.",
      ),
    ],
  },
  {
    id: "recommendations",
    title: "Get food and workout recommendations",
    category: "features",
    summary: "Use today’s logged meals and your preferences to get ideas.",
    sections: [
      section(
        "Get today’s ideas",
        "Open the Recommendations card in Activity and tap Get recommendations. Today’s journal meals and your preferences are sent to the Mac’s Insights server. After a few seconds, it returns a short daily summary, food suggestions with calories and protein, and workout ideas.",
      ),
      section(
        "Set your preferences",
        "The slider button opens targets for calories, protein, and sodium, plus diet, goal, allergies, disliked foods, fitness level, and injuries. Separate allergies, dislikes, and injuries with commas. Preferences stay on the phone.",
        "Empty targets use the defaults: 2,000 calories, about 100 g protein, and 2,300 mg sodium. Changing preferences clears existing suggestions. Tap Refresh for new ideas.",
      ),
      section(
        "What is included",
        "Only photo meals logged in BellAI count. Meals entered in other apps or directly in Apple Health are excluded. With no meals logged, BellAI asks you to log one and offers general ideas.",
        "The server filters suggestions that conflict with allergies, dislikes, diet, calorie budget, or injuries. If the chat model is unavailable, it returns safe default ideas instead.",
      ),
      section(
        "Try a sample day",
        "Debug builds offer low-protein, high-sodium, and on-track sample days. Samples do not change your meal journal.",
      ),
    ],
  },
  {
    id: "apple-health",
    title: "Connect and manage Apple Health",
    category: "features",
    summary: "View daily wellness totals and understand missing data.",
    sections: [
      section(
        "Connect your health data",
        "Activity opens Wellness. Tap Connect Apple Health or the heart button to request read access to steps, active energy, dietary water, dietary energy, protein, and workouts. Today’s totals and your latest workout appear. Pull to refresh or return to the app to update them.",
        "Health values read by the app stay on the phone. The Nutrition card includes totals for meals saved from photos.",
      ),
      section(
        "Why do I see a dash?",
        "A dash means there are no readable samples. This can mean missing data or unshared access; it is not a measured zero. Apple does not reveal whether read access was denied.",
      ),
      section(
        "Device and signing requirements",
        "The iOS target includes the HealthKit entitlement and usage descriptions for reading health data and saving nutrition. Developers must use a signing profile that supports HealthKit and test permissions and real data on a supported device. Other platforms show an unavailable state.",
      ),
    ],
  },
  {
    id: "privacy",
    title: "Where BellAI stores your data",
    category: "privacy",
    summary: "Understand your phone, Mac, private network, and permissions.",
    sections: [
      section(
        "Your own machines",
        "BellAI’s chat model, voice processing, food analysis, and saved data run on your own machines. The app communicates with your Mac server. Apple Weather is the outside service used for weather.",
      ),
      section(
        "No BellAI login",
        "There is no BellAI account. Access to your Tailscale network is the login, and the data server only answers devices on it. Your profile name, server settings, recommendation preferences, and meal journal are stored on your phone. Tasks are stored on the Mac.",
      ),
      section(
        "Conversation and health data",
        "Conversation history exists only in memory while the app runs. A new valid Home prompt clears the previous chat. Meal journal entries last 14 days. Read Apple Health totals remain on the phone; today’s journal meals and preferences are sent to your Mac when you request recommendations.",
      ),
      section(
        "Voice and mail",
        "Voice recordings are transcribed on the Mac, not by Apple. The app receives mail metadata and model notes rather than original emails. Every outgoing email requires your approval in the review screen.",
      ),
    ],
  },
  {
    id: "connection-help",
    title: "Troubleshoot a server connection",
    category: "troubleshooting",
    summary: "Find out what to check when BellAI cannot reach your Mac.",
    sections: [
      section(
        "Check your connection",
        "1. Confirm your phone is connected to your Tailscale network.",
        "2. Check that the Mac and required servers are running.",
        "3. Open Settings → Server options and check the host and ports. Tap Save and test.",
        "4. Allow local-network access if requested, check your server’s model configuration, and send your message again.",
      ),
      section(
        "Match the feature to the server",
        "Chat uses port 11434. Voice input and output, food photos, recommendations, and mail use 8000. Tasks use 8001. If only one feature fails, check its server first.",
        "For NetBird or local networking, use the Mac’s IP address. A long host name such as mac.netbird.cloud is blocked for plain HTTP in the app; short names and .local names are supported.",
      ),
      section(
        "Developer offline checks",
        "Run sh scripts/check-ollama.sh in the iOS project for chat, voice, meals, mail, recommendations, and settings checks. These checks use mock responses and need no server, API key, or device.",
      ),
    ],
  },
  {
    id: "weather",
    title: "Weather and location access",
    category: "general",
    summary: "See local weather in Agenda and check WeatherKit setup.",
    sections: [
      section(
        "Weather in Agenda",
        "Agenda on Home shows your city’s current temperature, condition, and daily high and low using Apple WeatherKit. It asks for approximate location once, while Agenda is open. The card includes Apple Weather attribution and a legal link.",
      ),
      section(
        "Development setup",
        "No API key is required. WeatherKit needs a paid Apple Developer Program membership and the WeatherKit capability on the app. Consult the iOS project’s Config/README.md for configuration. Run sh scripts/check-weather.sh for offline screen checks.",
      ),
    ],
  },
  {
    id: "routines",
    title: "Routine reminders and notifications",
    category: "general",
    summary: "Set daily reminders that can arrive even when BellAI is closed.",
    sections: [
      section(
        "Enable reminders",
        "Open Home → Routine and allow notifications, or save a routine to enable reminders. If notifications are denied, the Routine screen links to system notification settings.",
      ),
      section(
        "How scheduling works",
        "Reminders repeat daily in the timezone saved with the routine. Schedules refresh when the app becomes active. Once scheduled, delivery does not require the app or server to be running. Changes made on other devices sync the next time this app opens.",
        "Focus and system notification settings can silence or delay reminders. Reminder actions are displayed; they are not executed automatically.",
      ),
      section(
        "Developer checks",
        "Run sh scripts/check-routine-notifications.sh in the iOS project to check daily triggers, saved timezones, content, stable identifiers, and invalid schedules.",
      ),
    ],
  },
  {
    id: "home-and-profile",
    title: "Your Home screen and profile",
    category: "general",
    summary:
      "Find your tasks and mail, update your name, and understand previews.",
    sections: [
      section(
        "Your everyday overview",
        "Home shows live Plan (tasks) and Mail cards. Lights, Climate, and Security show static sample values and do not control devices yet. Activity contains Apple Health totals, meal logging, and recommendations.",
      ),
      section(
        "Make it yours",
        "Change the name in BellAI’s greeting under Settings → Profile. The name is kept on your phone. Server address settings are also under Settings.",
      ),
      section(
        "App icon for developers",
        "BellAi.png is the source icon, configured as the 1024-pixel AppIcon in BellAI/Assets.xcassets/AppIcon.appiconset. Remove transparency for App Store compatibility. Replace the image there to update the icon. If a simulator keeps showing the old icon, delete the app and run it again.",
      ),
    ],
  },
];
