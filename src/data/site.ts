export const calendlyUrl = "https://calendly.com/elmwoodproperties/apartment-tour";

// Web3Forms access key for the on-site application form (src/pages/apply.astro).
// Applications submitted on the site are emailed to whatever address was set up
// when this key was created at web3forms.com (admin@elmwoodapartmentsmn.com).
export const web3FormsAccessKey = "345819b0-730b-43df-be82-dbda7e54e906";

// Web3Forms access key for the maintenance request form. Web3Forms sends each
// key's submissions to the one address it was created with, so maintenance
// requests need their own key to reach maintenance@elmwoodproperties.com.
// TODO: replace with the key created for maintenance@elmwoodproperties.com —
// until then this is the admin key, so requests still go to admin@.
export const web3FormsMaintenanceKey = "345819b0-730b-43df-be82-dbda7e54e906";

// Preferred text-to-speech voice for the Fill-by-Voice tool and application
// readback (src/pages/apply.astro). The browser/OS supplies the actual voices
// (not the website), and the options differ by visitor's device, so this is a
// priority list of names to try — the first one present in a given visitor's
// browser wins, and it falls back to that browser's default English voice if
// none match. List names in order of preference, e.g. ["Google US English", "Samantha"].
// To see what a browser offers, run this in its devtools console:
//   speechSynthesis.getVoices().map(v => v.name)
export const ttsVoiceNames: string[] = [];
