/**
 * Export centralisé de tous les services API
 * 
 * ✅ UTILISATION CORRECTE :
 *   import { formationService } from '@/lib/api/services';
 *   const formations = await formationService.getPublic();
 * 
 * ❌ INCORRECT (ne pas importer directement apiClient) :
 *   import { apiClient } from '@/lib/api/client';
 *   const response = await apiClient.get('/api/...');
 * 
 * Toujours utiliser les services pour maintenir la centralisation
 */

// Website content services
export { partenaireService, equipeService } from './website.service';
export type { Partenaire, Membre } from './website.service';

export { bannerService } from './banner.service';
export type { Banner } from './banner.service';

// Formation services
export { authService } from './auth.service';
export { formationService } from './formation.service';
export { userService } from './user.service';
export { categoryService } from './category.service';
export { missionVisionService } from './missionvision.service';
export { faqService } from './faq.service';
export { participantService } from './participant.service';
export { centreFormationService } from './centreFormation.service';
export { sessionService } from './session.service';
export { parcoursService } from '@/lib/api/services/parcours.service';
export { certificationService } from './certification.service';
export { racService } from './rac.service';
