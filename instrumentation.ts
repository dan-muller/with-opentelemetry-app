import { registerOTel } from "@vercel/otel";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import { SimpleSpanProcessor } from "@opentelemetry/sdk-trace-base";
import {
  LoggerProvider,
  SimpleLogRecordProcessor
} from '@opentelemetry/sdk-logs';

export function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    registerOTel({
      serviceName: "with-opentelemetry-app",
      spanProcessors: [new SimpleSpanProcessor(new OTLPTraceExporter())],
      logRecordProcessor: new SimpleLogRecordProcessor(new OTLPLogExporter())
    });
  }
}
