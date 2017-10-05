import exchange from 'server/__mocks__/exchange';
import customerSourceUpdatedEvent from 'server/billing/__tests__/events/customerSourceUpdatedEvent';
import invoiceCreatedEvent from 'server/billing/__tests__/events/invoiceCreatedEvent';
import invoiceItemCreatedEvent from 'server/billing/__tests__/events/invoiceItemCreatedEvent';
import invoicePaymentFailedEvent from 'server/billing/__tests__/events/invoicePaymentFailedEvent';
import invoicePaymentSucceededEvent from 'server/billing/__tests__/events/invoicePaymentSucceededEvent';
import * as customerSourceUpdated from 'server/billing/handlers/customerSourceUpdated';
import * as invoiceCreated from 'server/billing/handlers/invoiceCreated';
import * as invoiceItemCreated from 'server/billing/handlers/invoiceItemCreated';
import * as invoicePaymentFailed from 'server/billing/handlers/invoicePaymentFailed';
import * as invoicePaymentSucceeded from 'server/billing/handlers/invoicePaymentSucceeded';
import stripeWebhookHandler from 'server/billing/stripeWebhookHandler';

const mockRes = () => ({
  sendStatus: jest.fn()
});

describe('stripeWebhookHandler', () => {
  test('handles invoice.created webhooks', async () => {
    // SETUP
    const objectId = invoiceCreatedEvent.data.object.id;
    const req = {body: invoiceCreatedEvent};

    const res = mockRes();
    const mockFn = invoiceCreated.default = jest.fn();

    // TEST
    await stripeWebhookHandler(exchange)(req, res);

    // VERIFY
    expect(mockFn).toBeCalledWith(objectId);
    expect(res.sendStatus).toBeCalledWith(200);
  });

  test('handles invoiceitem.created webhooks', async () => {
    // SETUP
    const objectId = invoiceItemCreatedEvent.data.object.id;
    const req = {body: invoiceItemCreatedEvent};

    const res = mockRes();
    const mockFn = invoiceItemCreated.default = jest.fn();

    // TEST
    await stripeWebhookHandler(exchange)(req, res);

    // VERIFY
    expect(mockFn).toBeCalledWith(objectId);
    expect(res.sendStatus).toBeCalledWith(200);
  });

  test('handles customer.source.updated webhooks', async () => {
    // SETUP
    // const objectId = customerSourceUpdatedEvent.data.object.id;
    const customerId = customerSourceUpdatedEvent.data.object.customer;
    const req = {body: customerSourceUpdatedEvent};

    const res = mockRes();
    const mockFn = customerSourceUpdated.default = jest.fn();

    // TEST
    await stripeWebhookHandler(exchange)(req, res);

    // VERIFY
    expect(mockFn).toBeCalledWith(customerId);
    expect(res.sendStatus).toBeCalledWith(200);
  });

  test('handles invoice.payment_failed webhooks', async () => {
    // SETUP
    const objectId = invoicePaymentFailedEvent.data.object.id;
    const req = {body: invoicePaymentFailedEvent};

    const res = mockRes();
    const mockFn = invoicePaymentFailed.default = jest.fn();

    // TEST
    await stripeWebhookHandler(exchange)(req, res);

    // VERIFY
    expect(mockFn).toBeCalledWith(objectId);
    expect(res.sendStatus).toBeCalledWith(200);
  });

  test('handles invoice.payment_succeeded webhooks', async () => {
    // SETUP
    const objectId = invoicePaymentSucceededEvent.data.object.id;
    const req = {body: invoicePaymentSucceededEvent};

    const res = mockRes();
    const mockFn = invoicePaymentSucceeded.default = jest.fn();

    // TEST
    await stripeWebhookHandler(exchange)(req, res);

    // VERIFY
    expect(mockFn).toBeCalledWith(objectId);
    expect(res.sendStatus).toBeCalledWith(200);
  });
});

