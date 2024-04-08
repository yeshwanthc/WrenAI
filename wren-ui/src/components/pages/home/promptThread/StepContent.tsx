import { Button, ButtonProps, Col, Row, Typography } from 'antd';
import FunctionOutlined from '@ant-design/icons/FunctionOutlined';
import { BinocularsIcon } from '@/utils/icons';
import CollapseContent, {
  Props as CollapseContentProps,
} from '@/components/pages/home/promptThread/CollapseContent';
import useAnswerStepContent from '@/hooks/useAnswerStepContent';

const { Text, Paragraph } = Typography;

interface Props {
  fullSql: string;
  isLastStep: boolean;
  sql: string;
  stepIndex: number;
  summary: string;
  threadResponseId: number;
}

export default function StepContent(props: Props) {
  const { fullSql, isLastStep, sql, stepIndex, summary, threadResponseId } =
    props;

  const {
    collapseContentProps,
    previewDataButtonProps,
    viewSQLButtonProps,
    viewSQLButtonText,
  } = useAnswerStepContent({
    fullSql,
    isLastStep,
    sql,
    threadResponseId,
    stepIndex,
  });

  const stepNumber = stepIndex + 1;

  return (
    <Row
      className={`pb-3${!isLastStep ? ' mb-5 border-b border-gray-3' : ''}`}
      wrap={false}
    >
      <Col className="text-center" flex="28px">
        <div className="gray-8 text-extra-bold">{stepNumber}.</div>
      </Col>
      <Col flex="auto">
        <Paragraph>
          <Text>{summary}</Text>
        </Paragraph>
        <Button
          {...(previewDataButtonProps as ButtonProps)}
          size="small"
          icon={
            <BinocularsIcon
              style={{
                paddingBottom: 2,
                marginRight: 8,
              }}
            />
          }
        >
          Preview Data
        </Button>
        <Button
          {...(viewSQLButtonProps as ButtonProps)}
          size="small"
          icon={<FunctionOutlined />}
        >
          {viewSQLButtonText}
        </Button>
        <CollapseContent
          {...(collapseContentProps as CollapseContentProps)}
          key={`collapse-${stepNumber}`}
        />
      </Col>
    </Row>
  );
}
