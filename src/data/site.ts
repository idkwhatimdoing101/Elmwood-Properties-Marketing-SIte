export const calendlyUrl = "https://calendly.com/elmwoodproperties/apartment-tour";

// Web3Forms access key for the on-site application form (src/pages/apply.astro).
// Applications submitted on the site are emailed to whatever address was set up
// when this key was created at web3forms.com (admin@elmwoodapartmentsmn.com).
export const web3FormsAccessKey = "345819b0-730b-43df-be82-dbda7e54e906";

// Preferred text-to-speech voice for the Fill-by-Voice tool and application
// readback (src/pages/apply.astro). The browser/OS supplies the actual voices
// (not the website), and the options differ by visitor's device, so this is a
// priority list of names to try — the first one present in a given visitor's
// browser wins, and it falls back to that browser's default English voice if
// none match. List names in order of preference, e.g. ["Google US English", "Samantha"].
// To see what a browser offers, run this in its devtools console:
//   speechSynthesis.getVoices().map(v => v.name)
export const ttsVoiceNames: string[] = [];
