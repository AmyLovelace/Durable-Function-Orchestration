
import { app, HttpHandler, HttpRequest, HttpResponse, InvocationContext } from '@azure/functions';
import * as df from 'durable-functions';
import { OrchestrationContext, OrchestrationHandler } from 'durable-functions';

const childOrchestrationUrl = 'http://localhost:8035/api/orchestrators/ChildOrquestrationOrchestrator';

const durableParentOrchestrator: OrchestrationHandler = function* (context: OrchestrationContext) {
    const outputs = [];

    const customStatus0 = { completionPercentage: 0.0, status: "before the call" };
    context.df.setCustomStatus(customStatus0);
    
    try {
        const response = yield context.df.callHttp({
            method: 'POST',
            url: childOrchestrationUrl,
        });

        const customStatusSuccess = { completionPercentage: 100.0, status: "Call succeeded" };
        context.df.setCustomStatus(customStatusSuccess);

        const formattedResponse = JSON.stringify(response, null, 2);
        outputs.push(formattedResponse);
    } catch (error) {
        const customStatusError = { completionPercentage: 100.0, status: "Call failed" };
        context.df.setCustomStatus(customStatusError);

        throw error;
    }

    return outputs;
};



df.app.orchestration('durableParentOrchestrator', durableParentOrchestrator);

const durableParentHttpStart: HttpHandler = async (request: HttpRequest, context: InvocationContext): Promise<HttpResponse> => {
    const client = df.getClient(context);
    const body: unknown = await request.text();
    const instanceId: string = await client.startNew('durableParentOrchestrator', { input: body });

    context.log(`Started orchestration with ID = '${instanceId}'.`);

    return client.createCheckStatusResponse(request, instanceId);
};

app.http('durableParentHttpStart', {
    route: 'orchestrators/{orchestratorName}',
    extraInputs: [df.input.durableClient()],
    handler: durableParentHttpStart,
});





