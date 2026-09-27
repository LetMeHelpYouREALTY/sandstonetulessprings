import { AMENITY_PAGE_COMMUNITY_LABEL } from "@/lib/amenities/config";
import { MASTER_PLAN_NAME } from "@/lib/community";

export const AMENITIES_PAGE_FAQ = [
	{
		question: `What grocery stores are near ${MASTER_PLAN_NAME}?`,
		answer:
			"Smith's Food and Drug on N Aliante Pkwy (89084) is the closest full-service supermarket many buyers use from the Sandstone / Aliante corridor; confirm drive time from your lot before you buy.",
	},
	{
		question: `How far is ${AMENITY_PAGE_COMMUNITY_LABEL} from the Las Vegas Strip?`,
		answer:
			"From the North Las Vegas 89084 area, the Las Vegas Strip is typically about 25–35 minutes by car via I-215 and I-15 in light traffic — often longer at peak times (approximate; verify with your navigation app).",
	},
	{
		question: `Are there hospitals near ${MASTER_PLAN_NAME}?`,
		answer:
			"Centennial Hills Hospital Medical Center on N Durango Dr serves the northwest Las Vegas valley; confirm current ER and specialty services and drive time from your address.",
	},
	{
		question: `Where do residents shop near Sandstone at Tule Springs?`,
		answer:
			"Target on N 5th St (89084) and Smith's on Aliante Pkwy anchor everyday retail and groceries; larger mall destinations are farther south in the valley.",
	},
	{
		question: `Is there golf near ${MASTER_PLAN_NAME}?`,
		answer:
			"Aliante Golf Club on Club House Dr in North Las Vegas is a public course in the Aliante master plan area north of the 89084 corridor.",
	},
	{
		question: `What parks are close to the Sandstone homes sales area?`,
		answer:
			"Floyd Lamb Park at Tule Springs offers trails, picnic areas, and wildlife viewing northwest of the community; Tule Springs Fossil Beds National Monument preserves desert landscape nearby — check NPS access before you visit.",
	},
	{
		question: `How long is the drive to Harry Reid International Airport from North Las Vegas 89084?`,
		answer:
			"Harry Reid International Airport is typically about 30–40 minutes by car depending on route and traffic — often via I-215 and I-15 (approximate).",
	},
	{
		question: `Which schools serve the 89084 area near Sandstone?`,
		answer:
			"Clark County School District assigns schools by address; William E. Ferron Elementary is one campus in the 89084 zip — verify your assigned schools on CCSD's zoning tools before you purchase.",
	},
] as const;
