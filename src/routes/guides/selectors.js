export const getGuidesByNames = state => state.guides.data.map(guide => guide.fio);
export const getGuidePage = state => state.guides.currentpage;
