import { ArticleType, HealthTestType, MedicamentType, PrescriptionType, SidePanelListType } from "@/ts/types";

const SidePanelLogic = () => {
    const formatBodyData = (dataType: string, data: any) => {
        let title = '';
        let url = '';
        let content: SidePanelListType = [];

        switch (dataType) {
            case 'articles':
                title = 'Top news';
                url = '/articles';
                content = data?.map((item: ArticleType) => {
                    return {
                        id: item.id,
                        title: item.title,
                        content: item.content,
                        image: item.image,
                    };
                });

                break;

            case 'healthTests':
                title = 'Popular tests';
                url = '/health-tests';
                content = data?.map((item: HealthTestType) => {
                    return {
                        id: item.id,
                        title: item.title,
                        content: item.description,
                    };
                });

                break;

            case 'prescriptions':
                title = 'Top prescriptions';
                url = '/prescriptions';
                content = data?.map((item: PrescriptionType) => {
                    return {
                        id: item.id,
                        title: item.title,
                        content: item.description,
                    };
                });

                break;

            case 'medicaments':
                title = 'Top medicaments';
                url = '/medicaments';
                content = data?.map((item: MedicamentType) => {
                    return {
                        id: item.id,
                        title: item.title,
                        content: item.description,
                        image: item.image
                    };
                });

                break;

            default:
                break;
        }

        return {
            title,
            url,
            content
        }
    }

    return {
        formatBodyData,
    }

}

export default SidePanelLogic;