import Counter from "./counter/CounterComponent";
import Newsletter from "./newsletter/NewsletterComponent";
import Consent from "./consent/ConsentComponent";
import Regid from "./regid/RegidComponent";
import EmailConfirmation from "./emailConfirmation/EmailConfirmation";
import Label from "./label/LabelComponent";
import PrivacyPolicy from "./privacyPolicy/PrivacyPolicyComponent";

/**
 * Below is the registery of the components which are included in the form renderer.
 */
export default {
  counter: Counter,
  newsletter: Newsletter,
  consent: Consent,
  regid: Regid,
  emailConfirmation: EmailConfirmation,
  label: Label,
  privacyPolicy: PrivacyPolicy,
};
