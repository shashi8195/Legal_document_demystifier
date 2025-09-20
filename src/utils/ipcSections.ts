// IPC Sections database with detailed descriptions
export interface IPCSection {
  section: string;
  title: string;
  description: string;
  punishment: string;
  applicableScenarios: string[];
  relatedSections: string[];
  examples: string[];
}

export const ipcSections: Record<string, IPCSection> = {
  "420": {
    section: "420",
    title: "Cheating and dishonestly inducing delivery of property",
    description: "Whoever cheats and thereby dishonestly induces the person deceived to deliver any property to any person, or to make, alter or destroy the whole or any part of a valuable security, or anything which is signed or sealed, and which is capable of being converted into a valuable security, shall be punished with imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.",
    punishment: "Imprisonment up to 7 years and fine",
    applicableScenarios: [
      "Fraudulent rental agreements",
      "Fake property documents",
      "Employment contract fraud",
      "Insurance fraud",
      "Banking fraud"
    ],
    relatedSections: ["415", "417", "418", "419"],
    examples: [
      "Creating fake rental agreements to collect advance money",
      "Forging employment contracts with false salary promises",
      "Creating fraudulent property sale deeds"
    ]
  },
  "415": {
    section: "415",
    title: "Cheating",
    description: "Whoever, by deceiving any person, fraudulently or dishonestly induces the person so deceived to do or omit to do any act which he would not do or omit if he were not so deceived, and which act or omission causes or is likely to cause damage or harm to that person in body, mind, reputation or property, is said to 'cheat'.",
    punishment: "Imprisonment up to 1 year or fine or both",
    applicableScenarios: [
      "Misleading contract terms",
      "False representations in agreements",
      "Deceptive business practices",
      "Fraudulent loan applications"
    ],
    relatedSections: ["417", "418", "420"],
    examples: [
      "Hiding important terms in rental agreements",
      "Misrepresenting property conditions",
      "False promises in employment contracts"
    ]
  },
  "406": {
    section: "406",
    title: "Punishment for criminal breach of trust",
    description: "Whoever commits criminal breach of trust shall be punished with imprisonment of either description for a term which may extend to three years, or with fine, or with both.",
    punishment: "Imprisonment up to 3 years or fine or both",
    applicableScenarios: [
      "Misuse of security deposits",
      "Breach of fiduciary duty",
      "Misappropriation of funds",
      "Violation of trust in contracts"
    ],
    relatedSections: ["405", "407", "408", "409"],
    examples: [
      "Landlord misusing tenant's security deposit",
      "Employer not paying promised salary",
      "Misuse of advance payments"
    ]
  },
  "405": {
    section: "405",
    title: "Criminal breach of trust",
    description: "Whoever, being in any manner entrusted with property, or with any dominion over property, dishonestly misappropriates or converts to his own use that property, or dishonestly uses or disposes of that property in violation of any direction of law prescribing the mode in which such trust is to be discharged, or of any legal contract, express or implied, which he has made touching the discharge of such trust, or wilfully suffers any other person so to do, commits 'criminal breach of trust'.",
    punishment: "As per section 406 - up to 3 years imprisonment",
    applicableScenarios: [
      "Misuse of entrusted property",
      "Violation of contractual obligations",
      "Breach of trust by agents",
      "Misappropriation by employees"
    ],
    relatedSections: ["406", "407", "408"],
    examples: [
      "Property manager misusing rental income",
      "Employee misusing company resources",
      "Agent not following client instructions"
    ]
  },
  "463": {
    section: "463",
    title: "Forgery",
    description: "Whoever makes any false document or false electronic record or part of a document or electronic record, with intent to cause damage or injury, to the public or to any person, or to support any claim or title, or to cause any person to part with property, or to enter into any express or implied contract, or with intent to commit fraud or that fraud may be committed, commits forgery.",
    punishment: "Imprisonment up to 2 years or fine or both",
    applicableScenarios: [
      "Forged signatures on contracts",
      "Fake documents",
      "Altered agreements",
      "False certificates"
    ],
    relatedSections: ["464", "465", "466", "467", "468", "469", "470", "471"],
    examples: [
      "Forging landlord's signature on lease",
      "Creating fake employment certificates",
      "Altering contract terms after signing"
    ]
  },
  "504": {
    section: "504",
    title: "Intentional insult with intent to provoke breach of the peace",
    description: "Whoever intentionally insults, and thereby gives provocation to any person, intending or knowing it to be likely that such provocation will cause him to break the public peace, or to commit any other offence, shall be punished with imprisonment of either description for a term which may extend to two years, or with fine, or with both.",
    punishment: "Imprisonment up to 2 years or fine or both",
    applicableScenarios: [
      "Harassment by landlords",
      "Workplace harassment",
      "Intimidation tactics",
      "Verbal abuse in disputes"
    ],
    relatedSections: ["506", "507", "509"],
    examples: [
      "Landlord using abusive language",
      "Employer threatening employee",
      "Harassment during contract disputes"
    ]
  },
  "506": {
    section: "506",
    title: "Punishment for criminal intimidation",
    description: "Whoever commits, the offence of criminal intimidation shall be punished with imprisonment of either description for a term which may extend to two years, or with fine, or with both; If threat be to cause death or grievous hurt, etc. - and if the threat be to cause death or grievous hurt, or to cause the destruction of any property by fire, or to cause an offence punishable with death or imprisonment for life, or with imprisonment for a term which may extend to seven years, or to impute, unchastity to a woman, shall be punished with imprisonment of either description for a term which may extend to seven years, or with fine, or with both.",
    punishment: "Imprisonment up to 2 years (simple) or 7 years (aggravated) or fine or both",
    applicableScenarios: [
      "Threats during contract negotiations",
      "Intimidation to sign agreements",
      "Coercion in business deals",
      "Threats of legal action"
    ],
    relatedSections: ["503", "504", "507"],
    examples: [
      "Threatening tenant to vacate illegally",
      "Coercing employee to accept unfair terms",
      "Intimidating party to sign contract"
    ]
  }
};

export const getRelevantIPCSections = (documentType: string, riskLevel: string): IPCSection[] => {
  const relevantSections: IPCSection[] = [];
  
  // Based on document type and risk level, return relevant IPC sections
  if (documentType.toLowerCase().includes('rental') || documentType.toLowerCase().includes('lease')) {
    relevantSections.push(ipcSections["420"], ipcSections["406"], ipcSections["506"]);
  }
  
  if (documentType.toLowerCase().includes('employment') || documentType.toLowerCase().includes('job')) {
    relevantSections.push(ipcSections["415"], ipcSections["405"], ipcSections["504"]);
  }
  
  if (riskLevel === 'high') {
    relevantSections.push(ipcSections["463"], ipcSections["420"]);
  }
  
  return relevantSections.slice(0, 3); // Return top 3 most relevant
};