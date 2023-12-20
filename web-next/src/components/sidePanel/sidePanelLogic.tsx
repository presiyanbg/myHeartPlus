import { ArticleType, HealthTestType, SidePanelListType } from "@/ts/types";

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